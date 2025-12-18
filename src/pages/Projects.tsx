import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import ProjectModal from '../components/ProjectModal'
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
  fontSize: 'clamp(36px, 6vw, 112px)',
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
  fontSize: 16,
  lineHeight: 1.6
}

const carouselContainerStyle: React.CSSProperties = {
  position: 'relative'
}

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollBehavior: 'smooth',
  paddingBottom: 25,
  scrollbarWidth: 'none', // Hide scrollbar for Firefox
  msOverflowStyle: 'none' // Hide scrollbar for IE/Edge
}

const navButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 10,
  transition: 'all 0.3s ease'
}

const navButtonLeftStyle: React.CSSProperties = {
  ...navButtonStyle,
  left: -24
}

const navButtonRightStyle: React.CSSProperties = {
  ...navButtonStyle,
  right: -24
}

const cardStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  borderRadius: 28,
  padding: '24px 28px',
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.015)',
  cursor: 'pointer',
  scrollSnapAlign: 'start',
  maxWidth: 'calc(40% - 150px)',
  minHeight: 400,
  flex: '0 0 auto',
  justifyContent: 'space-between'
}

const arrowButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: 20,
  right: 20,
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255,255,255,0.08)',
  transition: 'all 0.3s ease'
}

const previewShellStyle: React.CSSProperties = {
  width: '100%',
  height: 180,
  borderRadius: 20,
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.08)',
  flex: '0 0 auto',
  cursor: 'pointer'
}

const detailsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10
}

const titleRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 16,
  alignItems: 'flex-start'
}

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.2
}

const indexStyle: React.CSSProperties = {
  fontSize: 16,
  letterSpacing: 1.2,
  color: 'rgba(255,255,255,0.35)'
}

const cardDescStyle: React.CSSProperties = {
  margin: 20,
  color: 'rgba(255,255,255,0.7)',
  fontSize: 15,
  lineHeight: 1.5
}

const tagRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6
}

const tagStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: '4px 12px',
  border: '1px solid rgba(255,255,255,0.12)',
  fontSize: 11,
  letterSpacing: 0.3,
  color: 'rgba(255,255,255,0.75)'
}

const ArrowIcon: React.FC = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8}>
    <path d="M7 17L17 7M9 7H17V15" />
  </svg>
)

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = React.useState<typeof projects[0] | null>(null)
  const [currentPage, setCurrentPage] = React.useState(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Logic for 3 dots with 8 items (overlapping pages)
  const totalPages = 3

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Scroll by half the container width to visit the middle state
      const scrollAmount = scrollContainerRef.current.clientWidth / 2
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) return

      // Calculate progress 0 to 1
      const progress = scrollLeft / maxScroll
      // Map to page index (0 to totalPages - 1)
      const page = Math.round(progress * (totalPages - 1))
      setCurrentPage(page)
    }
  }

  const scrollToPage = (page: number) => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current
      const maxScroll = scrollWidth - clientWidth
      // Map page index to scroll position
      const scrollPos = (page / (totalPages - 1)) * maxScroll

      scrollContainerRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <PageWrapper title="" sectionId="projects" frameless>
        <section style={surfaceStyle}>
          <div style={glowStyle} />
          <div style={headingBlockStyle}>
            <h2 style={headingStyle}>
              RECENT
              <br />
              <span style={ghostTextStyle}>PROJECTS</span>
            </h2>
            <p style={leadStyle}>
              A curated stream of client launches, platforms, and experimental builds that lean into
              modern development practices and user-centric design.
            </p>
          </div>

          <div style={carouselContainerStyle}>
            {/* Left Navigation Button */}
            <motion.div
              style={navButtonLeftStyle}
              onClick={() => scroll('left')}
              whileHover={{ background: 'rgba(255,255,255,0.2)', scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.div>

            {/* Right Navigation Button */}
            <motion.div
              style={navButtonRightStyle}
              onClick={() => scroll('right')}
              whileHover={{ background: 'rgba(255,255,255,0.2)', scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.div>

            <div
              ref={scrollContainerRef}
              style={listStyle}
              onScroll={handleScroll}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  style={cardStyle}
                  whileHover={{ background: 'rgba(255,255,255,0.05)', translateY: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* <div style={arrowButtonStyle}>
                    <ArrowIcon />
                  </div> */}
                  <div style={previewShellStyle}>
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={detailsStyle}>
                    <div style={titleRowStyle}>
                      <h3 style={cardTitleStyle}>{project.title}</h3>
                      <span style={indexStyle}>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p style={cardDescStyle}>{project.shortDesc}</p>
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

            {/* Dot Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginTop: 20
            }}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => scrollToPage(index)}
                  style={{
                    width: currentPage === index ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: currentPage === index ? '#fff' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </section>
      </PageWrapper>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

export default Projects
