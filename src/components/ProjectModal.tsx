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
    padding: '32px 48px 48px'
}

const sectionTitleStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
    color: '#000'
}

const linkButtonStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#000',
    color: '#fff',
    textDecoration: 'none',
    display: 'inline-block',
    marginRight: 12,
    fontSize: 14,
    fontWeight: 500,
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
                        style={closeButtonStyle}
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>

                    <div style={headerStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <h2 style={{ fontSize: 36, margin: 0, letterSpacing: -1 }}>{project.title}</h2>
                            <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>{project.year}</span>
                        </div>
                        <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.6)', margin: '8px 0 16px' }}>
                            {project.role}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: 999,
                                        border: '1px solid rgba(0,0,0,0.1)',
                                        fontSize: 12,
                                        background: 'rgba(0,0,0,0.02)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={contentStyle}>
                        <div style={{ marginBottom: 32 }}>
                            <h3 style={sectionTitleStyle}>About This Project</h3>
                            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(0,0,0,0.7)' }}>
                                {project.description}
                            </p>
                        </div>

                        {project.highlights && project.highlights.length > 0 && (
                            <div style={{ marginBottom: 32 }}>
                                <h3 style={sectionTitleStyle}>Key Highlights</h3>
                                <ul style={{ margin: 0, paddingLeft: 20 }}>
                                    {project.highlights.map((highlight, idx) => (
                                        <li key={idx} style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(0,0,0,0.7)', marginBottom: 8 }}>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div>
                            <h3 style={sectionTitleStyle}>Links</h3>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={linkButtonStyle}
                                    >
                                         Live Demo
                                    </a>
                                )}
                                {project.links.repo && (
                                    <a
                                        href={project.links.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ ...linkButtonStyle, background: '#fff', color: '#000' }}
                                    >
                                        View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ProjectModal
