import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    role: string
    year: string
    images: string[]
    links: {
        live?: string
        repo?: string
    }
    highlights: string[]
}

interface ProjectModalProps {
    project: Project | null
    onClose: () => void
}

const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(8px)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    overflowY: 'auto'
}

const modalStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 32,
    maxWidth: 900,
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 50px 100px rgba(0,0,0,0.3)'
}

const imageHeaderStyle: React.CSSProperties = {
    width: '100%',
    height: 300,
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #353535 0%, #0e0914 100%)'
}

const projectImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
}

const headerStyle: React.CSSProperties = {
    padding: '40px 48px',
    borderBottom: '1px solid rgba(0,0,0,0.08)'
}

const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: 24,
    color: '#000'
}

const contentStyle: React.CSSProperties = {
    padding: '32px 48px 64px'
}

const sectionTitleStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
    color: '#000'
}

const linkButtonStyle: React.CSSProperties = {
    padding: '14px 28px',
    borderRadius: 999,
    border: '2px solid rgba(0,0,0,0.15)',
    background: '#fff',
    color: '#000',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    marginRight: 12,
    fontSize: 15,
    fontWeight: 600,
    transition: 'all 0.3s ease',
    cursor: 'pointer'
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onClose])

    if (!project) return null

    return (
        <AnimatePresence>
            <motion.div
                style={backdropStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    style={modalStyle}
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        style={{
                            ...closeButtonStyle,
                            zIndex: 10,
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)'
                        }}
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>

                    {/* Project Image Header */}
                    <div style={imageHeaderStyle}>
                        <img
                            src={project.images[0]}
                            alt={project.title}
                            style={projectImageStyle}
                        />
                        {/* Gradient Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '60%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '32px 48px'
                        }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                                    <h2 style={{ 
                                        fontSize: 42, 
                                        margin: 0, 
                                        letterSpacing: -1.5,
                                        color: '#fff',
                                        fontWeight: 700
                                    }}>
                                        {project.title}
                                    </h2>
                                    <span style={{ 
                                        fontSize: 16, 
                                        color: 'rgba(255,255,255,0.8)',
                                        background: 'rgba(255,255,255,0.15)',
                                        backdropFilter: 'blur(10px)',
                                        padding: '4px 12px',
                                        borderRadius: 999,
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}>
                                        {project.year}
                                    </span>
                                </div>
                                <p style={{ 
                                    fontSize: 16, 
                                    color: 'rgba(255,255,255,0.9)', 
                                    margin: 0,
                                    fontWeight: 500
                                }}>
                                    {project.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={headerStyle}>
                        <p style={{ 
                            fontSize: 17, 
                            lineHeight: 1.7, 
                            color: 'rgba(0,0,0,0.75)',
                            margin: '0 0 20px 0'
                        }}>
                            {project.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: 999,
                                        border: '1px solid rgba(0,0,0,0.15)',
                                        fontSize: 13,
                                        background: 'rgba(0,0,0,0.04)',
                                        fontWeight: 500
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {project.links.live && (
                                <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={linkButtonStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#000'
                                        e.currentTarget.style.color = '#fff'
                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#fff'
                                        e.currentTarget.style.color = '#000'
                                        e.currentTarget.style.transform = 'translateY(0)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                    Live Website
                                </a>
                            )}
                            {project.links.repo && (
                                <a
                                    href={project.links.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={linkButtonStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#000'
                                        e.currentTarget.style.color = '#fff'
                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#fff'
                                        e.currentTarget.style.color = '#000'
                                        e.currentTarget.style.transform = 'translateY(0)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View Code
                                </a>
                            )}
                        </div>
                    </div>

                    {/* <div style={contentStyle}>
                        {project.highlights && project.highlights.length > 0 && (
                            <div style={{ marginBottom: 32 }}>
                                <h3 style={sectionTitleStyle}>Key Highlights</h3>
                                <ul style={{ margin: 0, paddingLeft: 20 }}>
                                    {project.highlights.map((highlight, idx) => (
                                        <li key={idx} style={{ 
                                            fontSize: 15, 
                                            lineHeight: 1.8, 
                                            color: 'rgba(0,0,0,0.7)', 
                                            marginBottom: 8 
                                        }}>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div> */}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ProjectModal
