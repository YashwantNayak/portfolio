import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getRawFileContent,
  saveRawFileContent,
  syncAllFilesToGitHub,
  resetAllDataToDefaults,
  type DataFileName
} from '../data/dataStore'
import {
  getGitHubConfig,
  saveGitHubConfig,
  isGitHubConfigured,
  testGitHubConnection,
  commitBinaryFileToGitHub
} from '../utils/githubSync'

const ADMIN_USER_ID = (import.meta as any).env?.VITE_ADMIN_USER_ID 
const ADMIN_PASSWORD = (import.meta as any).env?.VITE_ADMIN_PASSWORD 
const AVAILABLE_FILES: { name: DataFileName; label: string; description: string }[] = [
  { name: 'projects.json', label: 'projects.json', description: 'Projects list & links' },
  { name: 'experience.json', label: 'experience.json', description: 'Work experience history' },
  { name: 'personalInfo.json', label: 'personalInfo.json', description: 'Personal details & stats' },
  { name: 'tools.json', label: 'tools.json', description: 'Tools & tech stack' },
  { name: 'blogPosts.json', label: 'blogPosts.json', description: 'Blog articles & content' }
]

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true'
  })

  // Auth state
  const [userIdInput, setUserIdInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')

  // Editor state
  const [activeFile, setActiveFile] = useState<DataFileName>('projects.json')
  const [codeContent, setCodeContent] = useState<string>('')
  const [isJsonValid, setIsJsonValid] = useState<boolean>(true)
  const [jsonErrorMsg, setJsonErrorMsg] = useState<string>('')

  // Toast / Saving status
  const [toast, setToast] = useState<{ text: string; isError?: boolean } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingResume, setIsUploadingResume] = useState(false)

  // GitHub Sync State
  const [showGithubModal, setShowGithubModal] = useState(false)
  const [githubToken, setGithubToken] = useState('')
  const [githubRepo, setGithubRepo] = useState('YashwantNayak/portfolio')
  const [githubBranch, setGithubBranch] = useState('main')
  const [isGhConnected, setIsGhConnected] = useState(false)
  const [ghTesting, setGhTesting] = useState(false)
  const [ghTestResult, setGhTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isSyncingAll, setIsSyncingAll] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)
  const pdfFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const cfg = getGitHubConfig()
    setGithubToken(cfg.token)
    setGithubRepo(cfg.repo)
    setGithubBranch(cfg.branch)
    setIsGhConnected(isGitHubConfigured())
  }, [])

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      showToast('Please select a valid .pdf file', true)
      return
    }

    setIsUploadingResume(true)
    showToast('Uploading resume PDF...')

    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string
        const cleanBase64 = base64Data.replace(/^data:application\/pdf;base64,/, '')

        // 1. Try local dev server disk write
        let diskSaved = false
        try {
          const res = await fetch('/api/upload-resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64Data, filename: file.name })
          })
          if (res.ok) {
            const data = await res.json()
            if (data.success) diskSaved = true
          }
        } catch {}

        // 2. Try direct GitHub commit if configured
        let ghSaved = false
        if (isGitHubConfigured()) {
          const gh1 = await commitBinaryFileToGitHub('public/resume.pdf', cleanBase64, 'Update resume.pdf via Admin Studio')
          const gh2 = await commitBinaryFileToGitHub('public/Yashwant CV.pdf', cleanBase64, 'Update Yashwant CV.pdf via Admin Studio')
          ghSaved = gh1.success && gh2.success
        }

        if (ghSaved) {
          showToast('Resume PDF committed to GitHub & live deployment started! 🚀')
        } else if (diskSaved) {
          showToast('Resume PDF updated successfully on disk! (public/resume.pdf)')
        } else {
          showToast('Uploaded to local session. Connect GitHub to auto-deploy PDF to site!', true)
        }
      } catch (err: any) {
        showToast(`Upload error: ${err.message}`, true)
      } finally {
        setIsUploadingResume(false)
        if (pdfFileInputRef.current) {
          pdfFileInputRef.current.value = ''
        }
      }
    }

    reader.onerror = () => {
      setIsUploadingResume(false)
      showToast('Failed to read PDF file', true)
    }

    reader.readAsDataURL(file)
  }

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop
    }
  }

  useEffect(() => {
    const raw = getRawFileContent(activeFile)
    setCodeContent(raw)
    validateJson(raw)
  }, [activeFile])

  const validateJson = (text: string) => {
    try {
      JSON.parse(text)
      setIsJsonValid(true)
      setJsonErrorMsg('')
    } catch (err: any) {
      setIsJsonValid(false)
      setJsonErrorMsg(err.message || 'Invalid JSON format')
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setCodeContent(val)
    validateJson(val)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.currentTarget
      const start = target.selectionStart
      const end = target.selectionEnd

      const newContent = codeContent.substring(0, start) + '  ' + codeContent.substring(end)
      setCodeContent(newContent)
      validateJson(newContent)

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2
      }, 0)
    }
  }

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(codeContent)
      const formatted = JSON.stringify(parsed, null, 2)
      setCodeContent(formatted)
      setIsJsonValid(true)
      setJsonErrorMsg('')
      showToast('JSON formatted successfully')
    } catch (e: any) {
      showToast('Fix JSON syntax errors first', true)
    }
  }

  const showToast = (text: string, isError = false) => {
    setToast({ text, isError })
    setTimeout(() => setToast(null), 4000)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (userIdInput.trim() === ADMIN_USER_ID && passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      setLoginError('')
      showToast('Authenticated as Admin')
    } else {
      setLoginError('Invalid User ID or Password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    showToast('Logged out')
  }

  const handleSaveFile = async () => {
    if (!isJsonValid) {
      showToast('Fix JSON syntax error before saving', true)
      return
    }

    setIsSaving(true)
    const result = await saveRawFileContent(activeFile, codeContent)
    setIsSaving(false)

    if (result.success) {
      if (result.githubSaved) {
        showToast(`🚀 Committed src/data/${activeFile} to GitHub! Live site is auto-deploying.`)
      } else if (result.diskSaved) {
        showToast(`💾 Saved src/data/${activeFile} to disk`)
      } else {
        showToast(`Saved ${activeFile} to browser only. Click "⚡ Connect GitHub" to save directly to files!`, true)
      }
    } else {
      showToast(`Save failed: ${result.error}`, true)
    }
  }

  const handleTestGitHub = async () => {
    setGhTesting(true)
    setGhTestResult(null)
    const res = await testGitHubConnection(githubToken, githubRepo)
    setGhTesting(false)
    setGhTestResult(res)
    if (res.success) {
      setIsGhConnected(true)
    }
  }

  const handleSaveGitHubConfig = () => {
    saveGitHubConfig({
      token: githubToken,
      repo: githubRepo,
      branch: githubBranch
    })
    const configured = Boolean(githubToken && githubToken.trim().length > 0)
    setIsGhConnected(configured)
    showToast(configured ? 'GitHub sync configuration saved!' : 'GitHub token cleared')
    if (configured) {
      setShowGithubModal(false)
    }
  }

  const handleSyncAllToGitHub = async () => {
    if (!isGitHubConfigured()) {
      showToast('Please enter & save your GitHub token first', true)
      setShowGithubModal(true)
      return
    }
    setIsSyncingAll(true)
    showToast('Pushing all 5 files to GitHub repository...')
    const res = await syncAllFilesToGitHub()
    setIsSyncingAll(false)

    if (res.success) {
      showToast('🎉 All 5 files committed to GitHub! Live site auto-deployment triggered.')
      setShowGithubModal(false)
    } else {
      showToast(`Sync finished with issues: ${res.errors.join(', ')}`, true)
    }
  }

  const handleResetDefaults = () => {
    if (window.confirm('Reset all data files back to default JSON values?')) {
      resetAllDataToDefaults()
      const raw = getRawFileContent(activeFile)
      setCodeContent(raw)
      validateJson(raw)
      showToast('All files reset to defaults')
    }
  }

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div style={styles.loginPage}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={styles.loginCard}
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span style={styles.darkTagPill}>ADMIN LOGIN</span>
            <h1 style={styles.title}>Data Studio</h1>
            <p style={styles.subtitle}>
              Sign in to manage portfolio data files.
            </p>
          </div>

          {loginError && (
            <div style={styles.errorAlert}>
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <input
                type="text"
                placeholder="User ID"
                value={userIdInput}
                onChange={e => setUserIdInput(e.target.value)}
                style={styles.inputField}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                style={styles.inputField}
                required
              />
            </div>

            <button type="submit" style={styles.pillWhiteBtn}>
              Sign In →
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // --- AUTHENTICATED DASHBOARD ---
  const lineCount = codeContent.split('\n').length

  return (
    <div style={styles.adminPage}>
      {/* Hide Scrollbars CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              ...styles.toast,
              background: toast.isError ? '#ef4444' : '#ffffff',
              color: toast.isError ? '#ffffff' : '#000000'
            }}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Card (Dark Surface Theme matching Projects Section) */}
      <div style={styles.darkSurfaceCard}>
        {/* Container Header Bar (Controls placed inside header, floating bar removed) */}
        <div style={styles.cardHeaderBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={styles.headerDot} />
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#f8f8f8', letterSpacing: -0.4 }}>
              Portfolio Data Studio
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              onClick={() => setShowGithubModal(true)}
              style={isGhConnected ? styles.ghConnectedBadge : styles.ghDisconnectedBadge}
              title="GitHub Direct File Commit Configuration"
            >
              {isGhConnected ? '🟢 GitHub Synced' : '⚡ Connect GitHub'}
            </button>
            <input
              type="file"
              ref={pdfFileInputRef}
              onChange={handleResumeUpload}
              accept="application/pdf"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => pdfFileInputRef.current?.click()}
              disabled={isUploadingResume}
              style={styles.headerOutlineBtn}
            >
              {isUploadingResume ? 'Uploading...' : '📄 Upload Resume PDF'}
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer" style={styles.headerGhostBtn}>
              View Site
            </a>
            <button onClick={handleFormatJson} style={styles.headerOutlineBtn}>
              Format JSON
            </button>
            <button onClick={handleSaveFile} disabled={isSaving} style={styles.headerWhitePillBtn}>
              {isSaving ? 'Saving...' : 'Save File'}
            </button>
            <button onClick={handleLogout} style={styles.headerGhostBtn}>
              Logout
            </button>
          </div>
        </div>

        {/* Fixed Medium Workspace Grid */}
        <div style={styles.workspaceGrid}>
          {/* File Explorer Sidebar */}
          <aside style={styles.fileSidebar} className="no-scrollbar">
            <div style={styles.sidebarTitleRow}>
              <span style={styles.sidebarTitle}>DATA FILES</span>
              <span style={styles.fileCountPill}>5 files</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AVAILABLE_FILES.map(file => {
                const isActive = activeFile === file.name
                return (
                  <button
                    key={file.name}
                    onClick={() => setActiveFile(file.name)}
                    style={isActive ? styles.activeFileCard : styles.fileCard}
                  >
                    <div style={{ fontWeight: 600, fontSize: 13, color: isActive ? '#000' : '#fff' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: 11, color: isActive ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                      {file.description}
                    </div>
                  </button>
                )
              })}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 16 }}>
              {/* GitHub Direct File Sync Card */}
              <div style={{ marginBottom: 14, padding: 12, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: 'rgba(255,255,255,0.5)' }}>
                    GITHUB FILE SYNC
                  </span>
                  <span style={{ fontSize: 10, color: isGhConnected ? '#4ade80' : '#f59e0b', fontWeight: 600 }}>
                    {isGhConnected ? 'Connected' : 'Not setup'}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10, lineHeight: 1.3 }}>
                  {isGhConnected
                    ? 'Edits commit directly to YashwantNayak/portfolio & deploy across all devices.'
                    : 'Connect GitHub token to commit edits directly to files.'}
                </div>
                <button
                  type="button"
                  onClick={() => setShowGithubModal(true)}
                  style={{ ...styles.headerOutlineBtn, width: '100%', textAlign: 'center', boxSizing: 'border-box', marginBottom: isGhConnected ? 8 : 0 }}
                >
                  ⚙️ GitHub Settings
                </button>
                {isGhConnected && (
                  <button
                    type="button"
                    onClick={handleSyncAllToGitHub}
                    disabled={isSyncingAll}
                    style={{
                      ...styles.headerOutlineBtn,
                      width: '100%',
                      textAlign: 'center',
                      boxSizing: 'border-box',
                      background: 'rgba(34, 197, 94, 0.12)',
                      borderColor: 'rgba(34, 197, 94, 0.35)',
                      color: '#4ade80'
                    }}
                  >
                    {isSyncingAll ? 'Syncing...' : '🚀 Push All 5 Files'}
                  </button>
                )}
              </div>

              {/* Resume Management */}
              <div style={{ marginBottom: 14, padding: 12, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                  RESUME MANAGEMENT
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10, lineHeight: 1.3 }}>
                  Upload a new PDF to update <strong style={{ color: '#fff' }}>public/resume.pdf</strong>.
                </div>
                <button
                  type="button"
                  onClick={() => pdfFileInputRef.current?.click()}
                  disabled={isUploadingResume}
                  style={{ ...styles.headerOutlineBtn, width: '100%', textAlign: 'center', boxSizing: 'border-box' }}
                >
                  {isUploadingResume ? 'Uploading...' : 'Upload Resume PDF'}
                </button>
              </div>

              <button onClick={handleResetDefaults} style={styles.resetOutlinedBtn}>
                Reset Defaults
              </button>
            </div>
          </aside>

          {/* Code Editor Panel */}
          <main style={styles.editorContainer}>
            {/* Editor Sub-Header */}
            <div style={styles.editorSubHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#f8f8f8' }}>
                  src/data/{activeFile}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  ({lineCount} lines)
                </span>
              </div>

              <div>
                {isJsonValid ? (
                  <span style={styles.validBadge}>✓ Valid JSON</span>
                ) : (
                  <span style={styles.invalidBadge}>Syntax Error</span>
                )}
              </div>
            </div>

            {!isJsonValid && jsonErrorMsg && (
              <div style={styles.syntaxErrorBox}>
                ⚠️ {jsonErrorMsg}
              </div>
            )}

            {/* Monospaced Editor Area (Scrollable internally without scrollbar) */}
            <div style={styles.editorTextareaWrap}>
              <div ref={lineNumbersRef} style={styles.lineNumberColumn} className="no-scrollbar">
                {Array.from({ length: lineCount }, (_, i) => i + 1).map(n => (
                  <div key={n}>{n}</div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={codeContent}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                spellCheck={false}
                className="no-scrollbar"
                style={styles.codeTextarea}
                placeholder="Edit JSON content..."
              />
            </div>

            {/* Bottom Footer Save Bar */}
            <div style={styles.editorFooter}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                Press <strong>Tab</strong> to indent. Saves directly to <strong>src/data/{activeFile}</strong>.
              </span>
              <button
                onClick={handleSaveFile}
                disabled={isSaving || !isJsonValid}
                style={!isJsonValid ? styles.disabledPillBtn : styles.whitePillSaveBtn}
              >
                {isSaving ? 'Saving...' : `Save ${activeFile}`}
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* GitHub Sync Modal */}
      <AnimatePresence>
        {showGithubModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setShowGithubModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={styles.modalContent}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>
                    GitHub Direct File Sync
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                    Save edits directly into GitHub repo files. Changes auto-deploy live to all devices!
                  </p>
                </div>
                <button
                  onClick={() => setShowGithubModal(false)}
                  style={styles.modalCloseBtn}
                >
                  ✕
                </button>
              </div>

              {/* Status Alert */}
              {ghTestResult && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    fontSize: 12,
                    marginBottom: 16,
                    background: ghTestResult.success ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: `1px solid ${ghTestResult.success ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    color: ghTestResult.success ? '#4ade80' : '#f87171'
                  }}
                >
                  {ghTestResult.success ? '✅ ' : '⚠️ '}
                  {ghTestResult.message}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={styles.modalLabel}>Personal Access Token (classic or fine-grained)</label>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+Admin+Sync"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.tokenLink}
                    >
                      Create token on GitHub ↗
                    </a>
                  </div>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={e => setGithubToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    style={styles.modalInput}
                  />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, display: 'block' }}>
                    Requires <strong>repo</strong> permissions. Stored safely in your browser.
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                  <div>
                    <label style={styles.modalLabel}>Repository (owner/repo)</label>
                    <input
                      type="text"
                      value={githubRepo}
                      onChange={e => setGithubRepo(e.target.value)}
                      placeholder="YashwantNayak/portfolio"
                      style={styles.modalInput}
                    />
                  </div>
                  <div>
                    <label style={styles.modalLabel}>Branch</label>
                    <input
                      type="text"
                      value={githubBranch}
                      onChange={e => setGithubBranch(e.target.value)}
                      placeholder="main"
                      style={styles.modalInput}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={handleTestGitHub}
                    disabled={ghTesting || !githubToken.trim()}
                    style={styles.modalSecondaryBtn}
                  >
                    {ghTesting ? 'Testing...' : '🔍 Test Connection'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveGitHubConfig}
                    style={styles.modalPrimaryBtn}
                  >
                    Save Configuration
                  </button>
                </div>

                {isGhConnected && (
                  <div style={{ marginTop: 10, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                      One-Click Local Data Migration
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>
                      Push all data currently in your browser (projects, experience, tools, blogs, etc.) straight into GitHub repository files:
                    </div>
                    <button
                      type="button"
                      onClick={handleSyncAllToGitHub}
                      disabled={isSyncingAll}
                      style={{
                        ...styles.modalPrimaryBtn,
                        width: '100%',
                        background: '#22c55e',
                        color: '#000'
                      }}
                    >
                      {isSyncingAll ? 'Syncing 5 files...' : '🚀 Push All 5 Files to GitHub Now'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Dark Surface Theme Styles matching Projects Section
const styles: Record<string, React.CSSProperties> = {
  loginPage: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f4f4f6',
    padding: 20,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  loginCard: {
    width: '100%',
    maxWidth: 420,
    padding: '40px 36px',
    borderRadius: 40,
    background: '#070707',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
    color: '#f8f8f8'
  },
  darkTagPill: {
    padding: '4px 12px',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 1
  },
  title: {
    margin: '12px 0 6px',
    fontSize: 28,
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '-0.8px'
  },
  subtitle: {
    margin: 0,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.5
  },
  inputField: {
    width: '100%',
    padding: '14px 18px',
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box'
  },
  pillWhiteBtn: {
    width: '100%',
    padding: '14px 0',
    borderRadius: 999,
    border: 'none',
    background: '#ffffff',
    color: '#000000',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 8
  },
  errorAlert: {
    padding: '12px 16px',
    borderRadius: 14,
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#f87171',
    fontSize: 13,
    marginBottom: 20
  },
  hintText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)'
  },

  // Authenticated Admin Dashboard Page
  adminPage: {
    height: '100vh',
    background: '#f4f4f6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '24px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  darkSurfaceCard: {
    width: '100%',
    maxWidth: 1240,
    height: 'min(820px, calc(100vh - 48px))',
    background: '#070707',
    borderRadius: 40,
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)',
    color: '#f8f8f8',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  cardHeaderBar: {
    padding: '20px 28px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255, 255, 255, 0.015)'
  },
  headerDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#22c55e'
  },
  headerGhostBtn: {
    padding: '8px 16px',
    borderRadius: 999,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    textDecoration: 'none',
    fontWeight: 500,
    cursor: 'pointer'
  },
  headerOutlineBtn: {
    padding: '8px 16px',
    borderRadius: 999,
    border: '1px solid rgba(255, 255, 255, 0.15)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer'
  },
  headerWhitePillBtn: {
    padding: '8px 22px',
    borderRadius: 999,
    border: 'none',
    background: '#ffffff',
    color: '#000000',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer'
  },
  workspaceGrid: {
    display: 'grid',
    gridTemplateColumns: '270px 1fr',
    flex: 1,
    overflow: 'hidden'
  },
  fileSidebar: {
    background: 'rgba(0, 0, 0, 0.3)',
    borderRight: '1px solid rgba(255, 255, 255, 0.06)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  sidebarTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  sidebarTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.35)'
  },
  fileCountPill: {
    fontSize: 11,
    padding: '2px 8px',
    borderRadius: 999,
    background: 'rgba(255, 255, 255, 0.06)',
    color: 'rgba(255, 255, 255, 0.5)'
  },
  fileCard: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.06)',
    background: 'rgba(255, 255, 255, 0.02)',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  activeFileCard: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 16,
    border: 'none',
    background: '#ffffff',
    textAlign: 'left',
    cursor: 'pointer'
  },
  resetOutlinedBtn: {
    width: '100%',
    padding: '9px 0',
    borderRadius: 999,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer'
  },
  editorContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
    background: '#070707'
  },
  editorSubHeader: {
    padding: '14px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.01)'
  },
  validBadge: {
    padding: '3px 10px',
    borderRadius: 999,
    background: 'rgba(34, 197, 94, 0.15)',
    color: '#4ade80',
    fontSize: 12,
    fontWeight: 600
  },
  invalidBadge: {
    padding: '3px 10px',
    borderRadius: 999,
    background: 'rgba(239, 68, 68, 0.15)',
    color: '#f87171',
    fontSize: 12,
    fontWeight: 600
  },
  syntaxErrorBox: {
    padding: '8px 24px',
    background: 'rgba(239, 68, 68, 0.1)',
    borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    fontSize: 12,
    fontFamily: 'monospace'
  },
  editorTextareaWrap: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    background: '#070707'
  },
  lineNumberColumn: {
    padding: '18px 12px',
    background: 'rgba(0, 0, 0, 0.4)',
    color: 'rgba(255, 255, 255, 0.25)',
    fontSize: 13,
    fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
    lineHeight: 1.6,
    textAlign: 'right',
    userSelect: 'none',
    borderRight: '1px solid rgba(255, 255, 255, 0.04)',
    overflowY: 'hidden'
  },
  codeTextarea: {
    flex: 1,
    padding: 18,
    background: '#070707',
    color: '#f8f8f8',
    fontSize: 14,
    fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
    lineHeight: 1.6,
    border: 'none',
    outline: 'none',
    resize: 'none',
    whiteSpace: 'pre',
    overflowY: 'auto',
    tabSize: 2
  },
  editorFooter: {
    padding: '14px 24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    background: 'rgba(255, 255, 255, 0.01)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  whitePillSaveBtn: {
    padding: '10px 24px',
    borderRadius: 999,
    border: 'none',
    background: '#ffffff',
    color: '#000000',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer'
  },
  disabledPillBtn: {
    padding: '10px 24px',
    borderRadius: 999,
    border: 'none',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'not-allowed'
  },
  toast: {
    position: 'fixed',
    top: 24,
    right: 24,
    padding: '10px 20px',
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
    zIndex: 9999
  },
  ghConnectedBadge: {
    padding: '7px 14px',
    borderRadius: 999,
    border: '1px solid rgba(34, 197, 94, 0.4)',
    background: 'rgba(34, 197, 94, 0.1)',
    color: '#4ade80',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  ghDisconnectedBadge: {
    padding: '7px 14px',
    borderRadius: 999,
    border: '1px solid rgba(245, 158, 11, 0.4)',
    background: 'rgba(245, 158, 11, 0.1)',
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: 20
  },
  modalContent: {
    width: '100%',
    maxWidth: 520,
    background: '#111111',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: 24,
    padding: '28px 28px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
    color: '#ffffff',
    boxSizing: 'border-box'
  },
  modalCloseBtn: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    width: 28,
    height: 28,
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.7)',
    display: 'block',
    marginBottom: 6
  },
  tokenLink: {
    fontSize: 11,
    color: '#60a5fa',
    textDecoration: 'none'
  },
  modalInput: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    fontSize: 13,
    outline: 'none',
    boxSizing: 'border-box'
  },
  modalPrimaryBtn: {
    flex: 1,
    padding: '10px 18px',
    borderRadius: 999,
    border: 'none',
    background: '#ffffff',
    color: '#000000',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer'
  },
  modalSecondaryBtn: {
    padding: '10px 18px',
    borderRadius: 999,
    border: '1px solid rgba(255, 255, 255, 0.15)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    fontWeight: 500,
    fontSize: 13,
    cursor: 'pointer'
  }
}

export default Admin
