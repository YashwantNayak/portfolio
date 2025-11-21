import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import TypingAnimation from '../components/TypingAnimation'
import { stats } from '../content'
import { palette, shadows } from '../theme'

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: 48,
  alignItems: 'center'
}

const heroTitle: React.CSSProperties = {
  fontSize: 92,
  lineHeight: 0.9,
  margin: 0,
  letterSpacing: -4,
  color: palette.text
}

const smallHeroText: React.CSSProperties = {
  fontSize: 62,
  lineHeight: 0.9,
  margin: 0,
  letterSpacing: -3,
  color: palette.text
}

const paragraph: React.CSSProperties = {
  fontSize: 20,
  color: 'rgba(0,0,0,0.65)',
  lineHeight: 1.6,
  margin: '24px 0 32px'
}

const buttonRow: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap'
}

const buttonBase: React.CSSProperties = {
  borderRadius: 999,
  padding: '14px 32px',
  fontSize: 15,
  letterSpacing: 0.5,
  border: '1px solid rgba(0,0,0,0.08)',
  transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
  cursor: 'pointer'
}

const statsGrid: React.CSSProperties = {
  marginTop: 48,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 20
}

const statCard: React.CSSProperties = {
  borderRadius: 24,
  padding: 24,
  border: '1px solid rgba(0,0,0,0.08)',
  background: 'linear-gradient(145deg,#fff,#f7f7f7)',
  boxShadow: shadows.soft
}

const profileShell: React.CSSProperties = {
  width: '100%',
  minHeight: 420,
  borderRadius: 320,
  background: 'radial-gradient(circle at 30% 30%, #f7f7f7, #fff)',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: 'inset 0 0 60px rgba(0,0,0,0.04), 0 40px 90px rgba(15,23,42,0.12)',
  position: 'relative'
}

const profileInner: React.CSSProperties = {
  position: 'absolute',
  inset: 40,
  borderRadius: '50%',
  background: 'linear-gradient(135deg,#f4f4f4,#ffffff)',
  border: '1px solid rgba(0,0,0,0.08)'
}

const scrollToSection = (targetId: string) => {
  const element = document.getElementById(targetId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    // <PageWrapper
    //   sectionId="home"
    //   frameless
    //   title="SOFTWARE ENGINEER"
    //   subtitle="Modern, minimal interfaces engineered with cinematic motion, gentle gradients, and precise typography inspired by sawad.framer.website."
    // >
      <motion.div
        style={gridStyle}
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
         <h2 style={smallHeroText}>I am</h2>
        <h2 style={heroTitle}>
          <TypingAnimation
            roles={["Software Engineer", "Full-stack developer", "AI Enthusiast", "App Developer","Data Analyst",""]}
            typingSpeed={80}
            deletingSpeed={40}
            holdDelay={1200}
            startDelay={400}
            loop={true}
          />
        </h2>
        <p style={paragraph}>
          I work as a <b>Software Engineer</b>, but my skillset goes way beyond just one domain.
I’m also a Data Analyst, a Full-Stack Web & App Developer, and a UI/UX Designer who enjoys crafting clean interfaces and smooth user experiences.
        </p>
        <div style={buttonRow}>
          <button
            style={{
              ...buttonBase,
              background: palette.text,
              color: '#fff',
              boxShadow: shadows.hover
            }}
            onClick={() => navigate('/contact')}
          >
            Let's Connect
          </button>
        </div>
        <div style={statsGrid}>
          {stats.map((item) => (
            <motion.div key={item.label} style={statCard} whileHover={{ scale: 1.03 }}>
              <p style={{ margin: 0, fontSize: 56, letterSpacing: -2 }}>{item.value}</p>
              <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15 }}>{item.label}</span>
            </motion.div>
          ))}
        </div>
        </div>
      </motion.div>
    // </PageWrapper>
  )
}

export default Home
