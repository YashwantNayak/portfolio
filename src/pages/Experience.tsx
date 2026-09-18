import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { usePortfolioData } from '../data'
import { palette } from '../theme'

const lineStyle: React.CSSProperties = {
  position: 'absolute',
  left: 20,
  top: 0,
  bottom: 0,
  width: 2,
  background: 'rgba(0,0,0,0.08)'
}

const Experience: React.FC = () => {
  const { experience } = usePortfolioData()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxPhoto) {
        setLightboxPhoto(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxPhoto])

  return (
    <>
      <style>{`
        .memories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .memories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .memories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <PageWrapper
        sectionId="experience"
        frameless
        title="Experience"
        subtitle="A showcase of my work in developing, improving, and delivering scalable software projects."
      >
        <div style={{ position: 'relative', paddingLeft: 40 }}>
          <span style={lineStyle} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {experience.map((item) => {
              const isExpanded = expandedId === item.id

              return (
                <motion.article
                  key={item.id}
                  style={{
                    padding: '28px 32px',
                    borderRadius: 24,
                    border: isExpanded ? '1px solid rgba(0,0,0,0.18)' : '1px solid rgba(0,0,0,0.08)',
                    background: isExpanded ? '#ffffff' : 'rgba(247,247,247,0.6)',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: isExpanded ? '0 15px 40px rgba(0,0,0,0.08)' : 'none',
                    transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{
                    background: '#ffffff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
                  }}
                  onClick={() => toggleExpand(item.id)}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: -28,
                      top: 33,
                      width: 18,
                      height: 18,
                      boxSizing: 'border-box',
                      borderRadius: '50%',
                      background: isExpanded ? '#000000' : '#ffffff',
                      border: isExpanded ? '4px solid #000000' : '4px solid #8c8c8c',
                      boxShadow: '0 0 0 3px #ffffff',
                      transition: 'all 0.3s ease',
                      zIndex: 5
                    }}
                  />

                  {/* Top Card Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, color: palette.text }}>
                        {item.company}
                      </h3>
                      <p style={{ margin: 0, color: palette.muted, fontSize: 16, fontWeight: 500 }}>
                        {item.role}
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: 14, letterSpacing: 0.5, color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>
                        {item.date} {item.location ? `· ${item.location}` : ''}
                      </p>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(0,0,0,0.6)',
                        flexShrink: 0,
                        marginTop: 4
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.div>
                  </div>

                  <p style={{ margin: '16px 0 0', color: palette.muted, lineHeight: 1.6, fontSize: 15 }}>
                    {item.summary}
                  </p>

                  {/* In-Line Expanded Accordion Section */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingTop: 24, marginTop: 20, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                          {/* Key Achievements List */}
                          {item.highlights && item.highlights.length > 0 && (
                            <div style={{ marginBottom: 24 }}>
                              <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                                Key Achievements & Responsibilities
                              </h4>
                              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {item.highlights.map((highlight, idx) => (
                                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'rgba(0,0,0,0.75)', lineHeight: 1.5 }}>
                                    <span style={{ color: 'rgba(0,0,0,0.4)', fontWeight: 700, fontSize: 14, marginTop: 1 }}>•</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Memories & Photos Gallery Grid (3 photos per row) */}
                          {item.memories && item.memories.length > 0 && (
                            <div>
                              <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                                Work Memories & Gallery
                              </h4>
                              <div className="memories-grid">
                                {item.memories.map((photo, imgIdx) => (
                                  <motion.div
                                    key={imgIdx}
                                    style={{
                                      position: 'relative',
                                      aspectRatio: '4/3',
                                      borderRadius: 16,
                                      overflow: 'hidden',
                                      border: '1px solid rgba(0,0,0,0.06)',
                                      background: '#f3f4f6',
                                      cursor: 'pointer'
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setLightboxPhoto(photo)
                                    }}
                                  >
                                    <img
                                      src={photo}
                                      alt={`${item.company} memory ${imgIdx + 1}`}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </div>
        </div>
      </PageWrapper>

      {/* Lightbox Enlarged Image Preview */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 30px 90px rgba(0,0,0,0.5)'
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#ffffff',
                  fontSize: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                onClick={() => setLightboxPhoto(null)}
              >
                ×
              </button>
              <img
                src={lightboxPhoto}
                alt="Enlarged memory"
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Experience




