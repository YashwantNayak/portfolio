import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import UnicornScene from 'unicornstudio-react'
import TypingAnimation from '../components/TypingAnimation'
import { stats, personalInfo } from '../content'
import { palette, shadows } from '../theme'

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '400px 1fr',
  gap: 80,
  alignItems: 'center',
  maxWidth: 1400,
  margin: '0 auto',
  padding: '0 40px'
}

const heroTitle: React.CSSProperties = {
  fontSize: 74,
  lineHeight: 1.1,
  margin: 0,
  letterSpacing: -2,
  color: palette.text,
  maxWidth: '100%',
  wordBreak: 'break-word',
  minHeight: '140px',
  display: 'flex',
  alignItems: 'flex-start'
}

const smallHeroText: React.CSSProperties = {
  fontSize: 60,
  lineHeight: 1,
  margin: 0,
  letterSpacing: -2,
  color: palette.text
}

const paragraph: React.CSSProperties = {
  fontSize: 18,
  color: 'rgba(0,0,0,0.65)',
  lineHeight: 1.6,
  margin: '48px 0 32px',
  maxWidth: 600
}

const buttonRow: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  maxWidth: 600
}

const buttonBase: React.CSSProperties = {
  borderRadius: 999,
  padding: '14px 32px',
  fontSize: 15,
  letterSpacing: 0.5,
  border: '1px solid rgba(0,0,0,0.08)',
  transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease',
  cursor: 'pointer',
  fontFamily: 'inherit'
}

const statsGrid: React.CSSProperties = {
  marginTop: 48,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 20,
  maxWidth: 600
}

const statCard: React.CSSProperties = {
  borderRadius: 24,
  padding: 24,
  border: '1px solid rgba(0,0,0,0.08)',
  background: 'linear-gradient(145deg,#fff,#f7f7f7)',
  boxShadow: shadows.soft
}

const profileContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  perspective: '1000px'
}

const profileShell: React.CSSProperties = {
  position: 'relative',
  width: 360,
  height: 640,
  borderRadius: 24,
  background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
  boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)',
  overflow: 'hidden'
}

const profileImageWrapper: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 24,
  overflow: 'hidden',
  background: '#fff',
  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)'
}

const profileImage: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center'
}

const spiderImageButtonStyle: React.CSSProperties = {
  position: 'fixed',
  top: -10,
  right: 80,
  width: 180,
  height: 140,
  cursor: 'pointer',
  zIndex: 70
}

const spiderImageStyle: React.CSSProperties = {
  width: '130%',
  height: '130%',
  objectFit: 'contain',
  userSelect: 'none',
  pointerEvents: 'none'
}

const spiderBackdropStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.45)',
  backdropFilter: 'blur(10px)',
  zIndex: 95,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
}

const spiderModalStyle: React.CSSProperties = {
  position: 'absolute',
  width: 'min(82vw, 900px)',
  aspectRatio: '16/10',
  maxHeight: '82vh',
  borderRadius: 18,
  border: '1px solid rgba(0, 0, 0, 0.28)',
  background: 'linear-gradient(150deg, #000000 0%, #000000 100%)',
  boxShadow: shadows.deep,
  padding: 1,
  overflow: 'hidden',
  isolation: 'isolate'
}

const spiderSceneWrapStyle: React.CSSProperties = {
  // position: 'absolute',
  width: '100px',
  height: '120px',
  borderRadius: 14,
  background: '#0b0b0b',
  overflow: 'hidden'
}

const spiderSceneInnerStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  transform: 'translateY(-7%) scale(1.08)',
  transformOrigin: 'top center',
  pointerEvents: 'none',
  zIndex: 0
}

const spiderCloseButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: 16,
  right: 16,
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: `1px solid ${palette.outline}`,
  background: '#fff',
  color: palette.text,
  fontSize: 22,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 10,
  pointerEvents: 'auto'
}

const scrollToSection = (targetId: string) => {
  const element = document.getElementById(targetId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [isSpiderModalOpen, setIsSpiderModalOpen] = React.useState(false)

  React.useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSpiderModalOpen(false)
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  return (
    <>
      <motion.div
        style={spiderImageButtonStyle}
        initial={{ opacity: 0, y: -120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 5.75, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        role="button"
        tabIndex={0}
        onClick={() => setIsSpiderModalOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setIsSpiderModalOpen(true)
          }
        }}
        aria-label="Open spider modal"
      >
        <img src="/spider.png" alt="Spider icon" style={spiderImageStyle} />
      </motion.div>

      <AnimatePresence>
        {isSpiderModalOpen && (
          <motion.div
            style={spiderBackdropStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSpiderModalOpen(false)}
          >
            <motion.div
              style={spiderModalStyle}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                style={spiderCloseButtonStyle}
                onClick={() => setIsSpiderModalOpen(false)}
                aria-label="Close Spider modal"
              >
                ×
              </button>

              <div style={spiderSceneWrapStyle}>
                <div style={spiderSceneInnerStyle}>
                  <UnicornScene
                    projectId="zdMdn2BqTQCRb3EBGdww"
                    width="100%"
                    height="100%"
                    scale={1}
                    dpi={1.5}
                    sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.6/dist/unicornStudio.umd.js"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" style={{ width: '100%', padding: '48px 0' }}>
        <motion.div
          style={gridStyle}
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
        {/* Profile Image Section - LEFT */}
        <div style={profileContainer}>
          <motion.div
            style={profileShell}
            initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: 0
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { duration: 0.8, delay: 0.2 },
              rotateY: { duration: 0.8, delay: 0.2 }
            }}
            whileHover={{
              scale: 1.03,
              rotateY: -5,
              boxShadow: '0 30px 80px rgba(0,0,0,0.2), 0 15px 30px rgba(0,0,0,0.15)'
            }}
          >
            <div style={profileImageWrapper}>
              <img
                src="/linkedin-profile.png"
                alt="Yashwant Nayak - Software Engineer"
                style={profileImage}
              />
            </div>

            {/* Social Links Overlay - Bottom of Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: 60,
                left: '20%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <a
                href="https://github.com/yashwantnayak"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/yashwantnayak"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0077b5'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://twitter.com/yashwantnayak"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="mailto:yashwant@example.com"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000'
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Text Section - RIGHT */}
        <div>
          <h2 style={smallHeroText}>I am</h2>
          <h3 style={heroTitle}>
            <TypingAnimation
              roles={["Software Engineer", "Full-stack Developer", "AI Enthusiast", "App Developer", "Data Analyst"]}
              typingSpeed={80}
              deletingSpeed={40}
              holdDelay={1200}
              startDelay={400}
              loop={true}
            />
          </h3>
          <p style={paragraph}>
            {personalInfo.bio}
          </p>
          <div style={buttonRow}>
            <motion.button
              style={{
                ...buttonBase,
                background: palette.text,
                color: '#fff',
                boxShadow: shadows.hover
              }}
              onClick={() => navigate('/resume')}
              whileHover={{ scale: 1.05, boxShadow: shadows.deep }}
              whileTap={{ scale: 0.95 }}
            >
              View Resume
            </motion.button>
            <motion.button
              style={{
                ...buttonBase,
                background: palette.background,
                color: palette.text
              }}
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05, borderColor: 'rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.button>
          </div>
          <div style={statsGrid}>
            {stats.map((item) => (
              <motion.div
                key={item.label}
                style={statCard}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{ margin: 0, fontSize: 56, letterSpacing: -2, fontWeight: 700 }}>{item.value}</p>
                <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15 }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.div>
      </section>
    </>
  )
}

export default Home
