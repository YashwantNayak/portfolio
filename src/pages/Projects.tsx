import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { projects } from '../content'

const surfaceStyle: React.CSSProperties = {
  background: '#070707',
  borderRadius: 40,
  border: '1px solid rgba(255,255,255,0.06)',
  padding: '48px 36px',
  color: '#f8f8f8',
  position: 'relative',
  overflow: 'hidden'
}

const glowStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 'auto auto -80px -80px',
  width: 280,
  height: 280,
  background: 'radial-gradient(circle, rgba(255,161,66,0.35) 0%, rgba(7,7,7,0) 70%)',
  pointerEvents: 'none'
}

const headingBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  marginBottom: 42
}

const headingStyle: React.CSSProperties = {
  fontSize: 'clamp(42px, 8vw, 94px)',
  letterSpacing: -2,
  lineHeight: 1,
  margin: 0
}

const ghostTextStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.15)',
  display: 'inline-block'
}

const leadStyle: React.CSSProperties = {
  margin: 0,
  color: 'rgba(255,255,255,0.68)',
  maxWidth: 520,
  fontSize: 18,
  lineHeight: 1.6
}

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20
}

const cardStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 24,
  borderRadius: 28,
  padding: '28px 32px',
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.015)'
}

const arrowButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: 24,
  right: 24,
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255,255,255,0.08)'
}

const previewShellStyle: React.CSSProperties = {
  width: 140,
  height: 140,
  borderRadius: 24,
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.08)',
  flex: '0 0 auto'
}

const detailsStyle: React.CSSProperties = {
  flex: '1 1 320px',
  display: 'flex',
  flexDirection: 'column',
  gap: 14
}

const titleRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 16,
  alignItems: 'flex-start'
}

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 30,
  lineHeight: 1.1
}

const indexStyle: React.CSSProperties = {
  fontSize: 26,
  letterSpacing: 1.5,
  color: 'rgba(255,255,255,0.35)'
}

const cardDescStyle: React.CSSProperties = {
  margin: 0,
  color: 'rgba(255,255,255,0.7)',
  lineHeight: 1.5
}

const tagRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10
}

const tagStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: '6px 16px',
  border: '1px solid rgba(255,255,255,0.12)',
  fontSize: 12,
  letterSpacing: 0.4,
  color: 'rgba(255,255,255,0.75)'
}

const ArrowIcon: React.FC = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8}>
    <path d="M7 17L17 7M9 7H17V15" />
  </svg>
)

const Projects: React.FC = () => (
  <PageWrapper title="Projects" sectionId="projects" frameless>
    <section style={surfaceStyle}>
      <div style={glowStyle} />
      <div style={headingBlockStyle}>
        <h2 style={headingStyle}>
          RECENT
          <br />
          <span style={ghostTextStyle}>PROJECTS</span>
        </h2>
        <p style={leadStyle}>
          A curated stream of client launches, templates, and experimental builds that lean into motion-first
          storytelling and immaculate systems thinking.
        </p>
      </div>
      <div style={listStyle}>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            style={cardStyle}
            whileHover={{ background: 'rgba(255,255,255,0.05)', translateY: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={arrowButtonStyle}>
              <ArrowIcon />
            </div>
            <div style={previewShellStyle}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${project.accent[0]}, ${project.accent[1]})`,
                  transform: 'scale(1.02)',
                  filter: 'saturate(120%)'
                }}
              />
            </div>
            <div style={detailsStyle}>
              <div style={titleRowStyle}>
                <h3 style={cardTitleStyle}>{project.title}</h3>
                <span style={indexStyle}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p style={cardDescStyle}>{project.description}</p>
              <div style={tagRowStyle}>
                {project.tags.map((tag) => (
                  <span key={tag} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </PageWrapper>
)

export default Projects
