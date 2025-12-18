import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { tools } from '../content'
import { palette, shadows } from '../theme'

const tabOptions = [
  
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'programming', label: 'Programming Languages' },
  { id: 'tools', label: 'Tools & Design' },
  { id: 'other', label: 'Other Skills' }
]

const techByCategory: Record<string, { name: string; logo: string }[]> = {
  programming: tools.Programming_languages,
  frontend: tools.frontend,
  backend: tools.backend,
  tools: tools.tools,
  other: tools.other
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 32
}

const tabBarContainer: React.CSSProperties = {
  display: 'flex',
  padding: 6,
  background: 'rgba(0,0,0,0.04)',
  borderRadius: 999,
  gap: 6,
  border: '1px solid rgba(0,0,0,0.06)',
  alignSelf: 'center'
}

const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '12px 28px',
  borderRadius: 999,
  border: 'none',
  background: isActive ? '#fff' : 'transparent',
  color: isActive ? palette.text : 'rgba(0,0,0,0.5)',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
  transition: 'all 0.3s ease',
  outline: 'none'
})

const contentAreaStyle: React.CSSProperties = {
  width: '100%',
  minHeight: 150,
  padding: 40,
  borderRadius: 28,
  background: '#fff',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: shadows.soft
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: 32,
  width: '100%'
}

const techItemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  textAlign: 'center'
}

const iconWrapperStyle: React.CSSProperties = {
  width: 72,
  height: 72,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  background: 'rgba(249, 4, 4, 0.02)',
  border: '1px solid rgba(0,0,0,0.04)',
  transition: 'all 0.3s ease'
}

const logoStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  objectFit: 'contain'
}

const techNameStyle: React.CSSProperties = {
  color: palette.text,
  fontSize: 14,
  fontWeight: 500,
  opacity: 0.8
}

const allToolsContainerStyle: React.CSSProperties = {
  width: '100%',
  marginTop: 16,
  padding: '32px 40px',
  borderRadius: 24,
  background: '#000000ff',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  justifyContent: 'center',
  alignItems: 'center'
}

const toolBadgeStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.08)',
  color: 'rgba(255,255,255,0.7)',
  fontSize: 13,
  fontWeight: 500,
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease'
}

const Tools: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState('programming')

  const activeData = techByCategory[activeTabId] || []
  const allTools = [...tools.Programming_languages, ...tools.frontend, ...tools.backend, ...tools.tools, ...tools.other]

  return (
    <PageWrapper
      sectionId="tools"
      frameless
      title="Tools & Technologies"
      subtitle="A curated stack of technologies I use to build digital products."
    >
      <div style={containerStyle}>
        {/* Tab Bar */}
        <div style={tabBarContainer}>
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              style={tabButtonStyle(activeTabId === tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={contentAreaStyle}>
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={gridStyle}
          >
            {activeData.map((tech, i) => (
              <motion.div
                key={tech.name}
                style={techItemStyle}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ y: -4 }}
              >
                <motion.div 
                  style={iconWrapperStyle}
                  whileHover={{ 
                    background: 'rgba(183, 171, 171, 0.04)',
                    borderColor: 'rgba(0,0,0,0.1)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
                  }}
                >
                  <img 
                    src={tech.logo} 
                    alt={tech.name} 
                    style={logoStyle}
                    loading="eager"
                    decoding="async"
                  />
                </motion.div>
                <div style={techNameStyle}>{tech.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* All Technologies List */}
        <motion.div 
          style={allToolsContainerStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {allTools.map((tool) => (
            <motion.div
              key={tool.name}
              style={toolBadgeStyle}
              whileHover={{ 
                background: 'rgba(43, 42, 42, 0.15)',
                color: '#fff',
                scale: 1.05
              }}
              transition={{ duration: 0.2 }}
            >
              {tool.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  )
}

export default Tools
