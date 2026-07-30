export interface ProjectLink {
  live?: string
  repo?: string
}

export interface Project {
  id: string
  title: string
  shortDesc: string
  description: string
  tags: string[]
  role: string
  year: string
  images: string[]
  links: ProjectLink
  accent?: string[]
  highlights: string[]
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  date: string
  summary: string
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  email: string
  location: string
  resumeUrl: string
}

export interface SocialLinks {
  github: string
  linkedin: string
  twitter: string
  email: string
}

export interface StatItem {
  label: string
  value: string
}

export interface ToolItem {
  name: string
  logo: string
}

export interface ToolsCategory {
  frontend: ToolItem[]
  backend: ToolItem[]
  Programming_languages: ToolItem[]
  tools: ToolItem[]
  other: ToolItem[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  read: string
  excerpt: string
  content: string
}
