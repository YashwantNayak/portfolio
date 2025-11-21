import React from 'react'
import { motion } from 'framer-motion'
import { palette, shadows, radii } from '../theme'

interface PageWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  sectionId?: string
  frameless?: boolean
}

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  padding: 48,
  borderRadius: radii.xl,
  background: palette.background,
  boxShadow: shadows.soft,
  border: `1px solid rgba(0,0,0,0.04)`
}

const titleStyle: React.CSSProperties = {
  fontSize: 52,
  letterSpacing: -2,
  margin: 0,
  lineHeight: 1,
  color: palette.text
}

const subtitleStyle: React.CSSProperties = {
  margin: '12px 0 32px',
  fontSize: 18,
  color: 'rgba(0,0,0,0.65)',
  maxWidth: 640
}

const PageWrapper: React.FC<PageWrapperProps> = (props: PageWrapperProps) => {
  const { title, subtitle, children, sectionId, frameless = false } = props

  const composedStyle = React.useMemo<React.CSSProperties>(
    () => ({
      ...wrapperStyle,
      background: frameless ? 'transparent' : wrapperStyle.background,
      border: frameless ? 'none' : wrapperStyle.border,
      boxShadow: frameless ? 'none' : wrapperStyle.boxShadow
    }),
    [frameless]
  )

  return (
    <motion.section
      id={sectionId}
      style={composedStyle}
      initial={{ opacity: 0, y: 45 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <header>
        <h1 style={titleStyle}>{title}</h1>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </header>
      {children}
    </motion.section>
  )
}

export default PageWrapper
