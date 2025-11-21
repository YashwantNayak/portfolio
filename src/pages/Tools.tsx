import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { tools } from '../content'
import { palette } from '../theme'

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 20
}

const cardStyle: React.CSSProperties = {
  borderRadius: 22,
  padding: 20,
  border: '1px solid rgba(0,0,0,0.06)',
  background: palette.subtle,
  minHeight: 120,
  display: 'flex',
  alignItems: 'flex-end',
  fontSize: 18,
  letterSpacing: 0.5
}

const Tools: React.FC = () => (
  <PageWrapper
    sectionId="tools"
    frameless
    title="Tools"
    subtitle="A tight stack of design and engineering tools used on every engagement."
  >
    <div style={gridStyle}>
      {tools.map((tool) => (
        <motion.div key={tool} style={cardStyle} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
          {tool}
        </motion.div>
      ))}
    </div>
  </PageWrapper>
)

export default Tools
