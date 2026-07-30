import { useState, useEffect } from 'react'
import initialPersonalInfo from './personalInfo.json'
import initialProjects from './projects.json'
import initialExperience from './experience.json'
import initialTools from './tools.json'
import initialBlogPosts from './blogPosts.json'

import type {
  PersonalInfo,
  SocialLinks,
  StatItem,
  Project,
  ExperienceItem,
  ToolsCategory,
  BlogPost
} from './types'

export type DataFileName = 'projects.json' | 'experience.json' | 'personalInfo.json' | 'tools.json' | 'blogPosts.json'

const STORAGE_KEYS: Record<DataFileName, string> = {
  'projects.json': 'portfolio_projects',
  'experience.json': 'portfolio_experience',
  'personalInfo.json': 'portfolio_personal_info',
  'tools.json': 'portfolio_tools',
  'blogPosts.json': 'portfolio_blog_posts'
}

const INITIAL_DATA: Record<DataFileName, any> = {
  'projects.json': initialProjects,
  'experience.json': initialExperience,
  'personalInfo.json': initialPersonalInfo,
  'tools.json': initialTools,
  'blogPosts.json': initialBlogPosts
}

type Listener = () => void
const listeners: Set<Listener> = new Set()

export const subscribeToDataChanges = (listener: Listener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const notifySubscribers = () => {
  listeners.forEach(fn => fn())
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error(`Failed to load ${key} from storage:`, e)
  }
  return fallback
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Failed to save ${key} to storage:`, e)
  }
}

export function getRawFileContent(fileName: DataFileName): string {
  const key = STORAGE_KEYS[fileName]
  const data = loadFromStorage(key, INITIAL_DATA[fileName])
  return JSON.stringify(data, null, 2)
}

export async function saveRawFileContent(
  fileName: DataFileName,
  jsonString: string
): Promise<{ success: boolean; diskSaved: boolean; error?: string }> {
  try {
    const parsedData = JSON.parse(jsonString)
    const storageKey = STORAGE_KEYS[fileName]
    saveToStorage(storageKey, parsedData)
    notifySubscribers()

    // Strip extension for API call (e.g., 'projects.json' -> 'projects')
    const fileKey = fileName.replace('.json', '')
    const diskSaved = await saveToDiskApi(fileKey, parsedData)

    return { success: true, diskSaved }
  } catch (e: any) {
    return { success: false, diskSaved: false, error: e.message || 'Invalid JSON format' }
  }
}

async function saveToDiskApi(file: string, data: any): Promise<boolean> {
  try {
    const res = await fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, data })
    })
    if (res.ok) {
      const result = await res.json()
      return result.success === true
    }
  } catch (e) {
    // Expected in production static hosting
  }
  return false
}

export function getFullPersonalInfo(): { personalInfo: PersonalInfo; socialLinks: SocialLinks; stats: StatItem[] } {
  return loadFromStorage(STORAGE_KEYS['personalInfo.json'], INITIAL_DATA['personalInfo.json'])
}

export function getPersonalInfo(): PersonalInfo {
  return getFullPersonalInfo().personalInfo
}

export function getSocialLinks(): SocialLinks {
  return getFullPersonalInfo().socialLinks
}

export function getStats(): StatItem[] {
  return getFullPersonalInfo().stats
}

export function getProjects(): Project[] {
  return loadFromStorage<Project[]>(STORAGE_KEYS['projects.json'], INITIAL_DATA['projects.json'])
}

export function getExperience(): ExperienceItem[] {
  return loadFromStorage<ExperienceItem[]>(STORAGE_KEYS['experience.json'], INITIAL_DATA['experience.json'])
}

export function getTools(): ToolsCategory {
  return loadFromStorage<ToolsCategory>(STORAGE_KEYS['tools.json'], INITIAL_DATA['tools.json'])
}

export function getBlogPosts(): BlogPost[] {
  return loadFromStorage<BlogPost[]>(STORAGE_KEYS['blogPosts.json'], INITIAL_DATA['blogPosts.json'])
}

export function resetAllDataToDefaults() {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
  notifySubscribers()
}

export function usePortfolioData() {
  const [, setTick] = useState(0)

  useEffect(() => {
    return subscribeToDataChanges(() => {
      setTick(prev => prev + 1)
    })
  }, [])

  return {
    personalInfo: getPersonalInfo(),
    socialLinks: getSocialLinks(),
    stats: getStats(),
    projects: getProjects(),
    experience: getExperience(),
    tools: getTools(),
    blogPosts: getBlogPosts()
  }
}
