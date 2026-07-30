import {
  getPersonalInfo,
  getSocialLinks,
  getStats,
  getProjects,
  getExperience,
  getTools,
  getBlogPosts
} from './dataStore'

export const personalInfo = getPersonalInfo()
export const socialLinks = getSocialLinks()
export const stats = getStats()
export const projects = getProjects()
export const experience = getExperience()
export const tools = getTools()
export const blogPosts = getBlogPosts()

export * from './types'
export * from './dataStore'
