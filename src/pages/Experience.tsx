import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { experience } from '../content'
import { palette } from '../theme'

const lineStyle: React.CSSProperties = {
  position: 'absolute',
  left: 20,
  top: 0,
  bottom: 0,
  width: 2,
  background: 'rgba(0,0,0,0.08)'
}

const Experience: React.FC = () => (
  <PageWrapper
    sectionId="experience"
    frameless
    title="Experience"
    subtitle="A timeline of collaborations with product teams, studios, and forward-looking companies."
  >
    <div style={{ position: 'relative', paddingLeft: 40 }}>
      <span style={lineStyle} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {experience.map((item) => (
          <motion.article
            key={item.company}
            style={{
              padding: 24,
              borderRadius: 20,
              border: '1px solid rgba(0,0,0,0.08)',
              background: 'rgba(247,247,247,0.6)',
              position: 'relative'
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          >
            <span
              style={{
                position: 'absolute',
                left: -35,
                top: 28,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#000'
              }}
            />
            <h3 style={{ margin: '0 0 6px', fontSize: 24 }}>{item.company}</h3>
            <p style={{ margin: 0, color: palette.muted, fontSize: 16, fontWeight: 500 }}>{item.role}</p>
            <p style={{ margin: '6px 0 0', fontSize: 14, letterSpacing: 1, color: 'rgba(0,0,0,0.5)' }}>{item.date}</p>
            <p style={{ margin: '16px 0 0', color: palette.muted, lineHeight: 1.6 }}>{item.summary}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </PageWrapper>
)

export default Experience
