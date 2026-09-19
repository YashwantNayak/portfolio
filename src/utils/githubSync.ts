/**
 * GitHub API synchronization utility for Admin Data Studio.
 * Enables direct committing of JSON data files and assets to the GitHub repository,
 * which triggers auto-deployment via GitHub Actions across all devices.
 */

export interface GitHubSyncConfig {
  token: string
  repo: string // format: 'owner/repo' e.g. 'YashwantNayak/portfolio'
  branch: string // e.g. 'main'
}

const STORAGE_KEY_TOKEN = 'portfolio_github_token'
const STORAGE_KEY_REPO = 'portfolio_github_repo'
const STORAGE_KEY_BRANCH = 'portfolio_github_branch'

const DEFAULT_REPO = 'YashwantNayak/portfolio'
const DEFAULT_BRANCH = 'main'

export function getGitHubConfig(): GitHubSyncConfig {
  const envToken = (import.meta as any).env?.VITE_GITHUB_TOKEN || ''
  const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN) || ''
  const token = storedToken || envToken

  const repo = localStorage.getItem(STORAGE_KEY_REPO) || DEFAULT_REPO
  const branch = localStorage.getItem(STORAGE_KEY_BRANCH) || DEFAULT_BRANCH

  return { token, repo, branch }
}

export function saveGitHubConfig(config: Partial<GitHubSyncConfig>): void {
  if (config.token !== undefined) {
    if (config.token.trim()) {
      localStorage.setItem(STORAGE_KEY_TOKEN, config.token.trim())
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN)
    }
  }
  if (config.repo !== undefined) {
    localStorage.setItem(STORAGE_KEY_REPO, config.repo.trim() || DEFAULT_REPO)
  }
  if (config.branch !== undefined) {
    localStorage.setItem(STORAGE_KEY_BRANCH, config.branch.trim() || DEFAULT_BRANCH)
  }
}

export function isGitHubConfigured(): boolean {
  const { token } = getGitHubConfig()
  return Boolean(token && token.trim().length > 0)
}

/**
 * Encodes string to UTF-8 base64 safely in browser
 */
function utf8ToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16))
    })
  )
}

/**
 * Tests connection to the configured GitHub repository with the provided or stored token
 */
export async function testGitHubConnection(customToken?: string, customRepo?: string): Promise<{
  success: boolean
  message: string
  userName?: string
  canPush?: boolean
}> {
  const { token: savedToken, repo: savedRepo } = getGitHubConfig()
  const token = (customToken ?? savedToken).trim()
  const repo = (customRepo ?? savedRepo).trim()

  if (!token) {
    return { success: false, message: 'GitHub Token is required.' }
  }

  try {
    // 1. Verify user identity
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    })

    if (!userRes.ok) {
      if (userRes.status === 401) {
        return { success: false, message: 'Invalid or expired Personal Access Token.' }
      }
      return { success: false, message: `GitHub API error: ${userRes.statusText}` }
    }

    const userData = await userRes.json()

    // 2. Check repository access & permissions
    const repoRes = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    })

    if (!repoRes.ok) {
      if (repoRes.status === 404) {
        return {
          success: false,
          message: `Repository "${repo}" not found or token lacks access permission.`,
          userName: userData.login
        }
      }
      return { success: false, message: `Cannot access repository "${repo}".`, userName: userData.login }
    }

    const repoData = await repoRes.json()
    const canPush = repoData.permissions?.push ?? true

    if (!canPush) {
      return {
        success: false,
        message: `Token for user @${userData.login} does not have push permissions to ${repo}.`,
        userName: userData.login,
        canPush: false
      }
    }

    return {
      success: true,
      message: `Connected as @${userData.login} to ${repo}! Push access verified.`,
      userName: userData.login,
      canPush: true
    }
  } catch (err: any) {
    return { success: false, message: `Connection failed: ${err.message}` }
  }
}

/**
 * Gets SHA of an existing file in GitHub repository
 */
async function getFileSha(
  path: string,
  token: string,
  repo: string,
  branch: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    )

    if (res.ok) {
      const data = await res.json()
      return data.sha || null
    }
    return null
  } catch {
    return null
  }
}

/**
 * Commits a data file (e.g. src/data/projects.json) directly to the GitHub repository
 */
export async function commitFileToGitHub(
  fileName: string,
  content: string,
  customCommitMessage?: string
): Promise<{
  success: boolean
  commitSha?: string
  commitUrl?: string
  error?: string
}> {
  const { token, repo, branch } = getGitHubConfig()

  if (!token) {
    return {
      success: false,
      error: 'GitHub Token not configured. Please add your token in GitHub Settings.'
    }
  }

  const filePath = `src/data/${fileName}`
  const commitMessage = customCommitMessage || `Update ${fileName} via Admin Data Studio`

  try {
    const existingSha = await getFileSha(filePath, token, repo, branch)

    const payload: Record<string, any> = {
      message: commitMessage,
      content: utf8ToBase64(content),
      branch: branch
    }

    if (existingSha) {
      payload.sha = existingSha
    }

    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.message || `GitHub commit failed (${res.status} ${res.statusText})`)
    }

    const data = await res.json()
    return {
      success: true,
      commitSha: data.commit?.sha,
      commitUrl: data.commit?.html_url
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Failed to commit file to GitHub'
    }
  }
}

/**
 * Commits binary file (such as resume PDF from base64) directly to GitHub
 */
export async function commitBinaryFileToGitHub(
  filePath: string,
  cleanBase64Data: string,
  commitMessage: string
): Promise<{
  success: boolean
  commitSha?: string
  commitUrl?: string
  error?: string
}> {
  const { token, repo, branch } = getGitHubConfig()

  if (!token) {
    return {
      success: false,
      error: 'GitHub Token not configured.'
    }
  }

  try {
    const existingSha = await getFileSha(filePath, token, repo, branch)

    const payload: Record<string, any> = {
      message: commitMessage,
      content: cleanBase64Data,
      branch: branch
    }

    if (existingSha) {
      payload.sha = existingSha
    }

    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.message || `GitHub commit failed (${res.status})`)
    }

    const data = await res.json()
    return {
      success: true,
      commitSha: data.commit?.sha,
      commitUrl: data.commit?.html_url
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Failed to upload binary file to GitHub'
    }
  }
}
