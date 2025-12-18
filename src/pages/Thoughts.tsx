import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { palette, shadows, radii } from '../theme'
import { tools } from '../content'

const resumeContentStyle: React.CSSProperties = {
  padding: 40,
  borderRadius: radii.lg,
  border: '1px solid rgba(0,0,0,0.08)',
  background: 'linear-gradient(145deg,#fff,#f7f7f7)',
  boxShadow: shadows.soft,
  marginBottom: 32
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  margin: '0 0 16px',
  color: palette.text,
  letterSpacing: -0.8
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 600,
  margin: '32px 0 12px',
  color: palette.text,
  letterSpacing: -0.5
}

const textStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: 'rgba(0,0,0,0.75)',
  marginBottom: 16
}

const listStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: 'rgba(0,0,0,0.75)',
  marginBottom: 16,
  paddingLeft: 24
}

const skillGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: 12,
  marginBottom: 24
}

const skillItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 14px',
  borderRadius: 12,
  background: '#fff',
  border: '1px solid rgba(0,0,0,0.06)',
  fontSize: 14,
  fontWeight: 500,
  color: palette.text
}

const skillCategoryTitle: React.CSSProperties = {
  fontWeight: 600,
  color: 'rgba(0,0,0,0.6)',
  margin: '16px 0 12px',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  fontSize: 12
}

const downloadButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  padding: '16px 32px',
  fontSize: 16,
  fontWeight: 600,
  color: '#fff',
  background: 'linear-gradient(135deg, #000, #333)',
  border: 'none',
  borderRadius: 999,
  cursor: 'pointer',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  textDecoration: 'none'
}

const IconDownload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const Thoughts: React.FC = () => {
  return (
    <PageWrapper
      sectionId="resume"
      title="Resume"
      subtitle="Professional experience, skills, and qualifications."
    >
      <div style={resumeContentStyle}>
        <h2 style={sectionTitleStyle}>Yashwant Nayak</h2>
        <p style={textStyle}>
          Full Stack Developer | UI/UX Enthusiast | Problem Solver
        </p>
        
        <h3 style={sectionHeadingStyle}>Professional Summary</h3>
        <p style={textStyle}>
          Passionate and detail-oriented software developer with expertise in building modern web applications. 
          Experienced in full-stack development, with a strong focus on creating intuitive user interfaces and 
          scalable backend systems. Skilled in React, TypeScript, Node.js, and various modern web technologies.
        </p>

        <h3 style={sectionHeadingStyle}>Education</h3>
        <p style={textStyle}>
          <strong>Bachelor of Technology in Computer Science</strong><br />
          [Your University Name] | [Year - Year]<br />
          Relevant coursework: Data Structures, Algorithms, Web Development, Database Management
        </p>

        <h3 style={sectionHeadingStyle}>Technical Skills</h3>
        
        <div style={skillCategoryTitle}>Frontend</div>
        <div style={skillGridStyle}>
          {tools.frontend.map((t) => (
            <div key={t.name} style={skillItemStyle}>
              <img src={t.logo} alt={t.name} style={{ width: 18, height: 18, objectFit: 'contain' }} />
              {t.name}
            </div>
          ))}
        </div>

        <div style={skillCategoryTitle}>Backend & Database</div>
        <div style={skillGridStyle}>
          {tools.backend.map((t) => (
            <div key={t.name} style={skillItemStyle}>
              <img src={t.logo} alt={t.name} style={{ width: 18, height: 18, objectFit: 'contain' }} />
              {t.name}
            </div>
          ))}
        </div>

        <div style={skillCategoryTitle}>Tools & Platforms</div>
        <div style={skillGridStyle}>
          {tools.tools.map((t) => (
            <div key={t.name} style={skillItemStyle}>
              <img src={t.logo} alt={t.name} style={{ width: 18, height: 18, objectFit: 'contain' }} />
              {t.name}
            </div>
          ))}
        </div>

        <div style={skillCategoryTitle}>Other Skills</div>
        <div style={skillGridStyle}>
          {tools.other.map((t) => (
            <div key={t.name} style={skillItemStyle}>
              <img src={t.logo} alt={t.name} style={{ width: 18, height: 18, objectFit: 'contain' }} />
              {t.name}
            </div>
          ))}
        </div>

        <h3 style={sectionHeadingStyle}>Professional Experience</h3>
        <p style={textStyle}>
          <strong>Software Developer</strong> | [Company Name]<br />
          [Month Year] - Present<br />
          • Developed and maintained responsive web applications using React and TypeScript<br />
          • Collaborated with cross-functional teams to deliver high-quality software solutions<br />
          • Implemented modern UI/UX designs with attention to accessibility and performance<br />
          • Optimized application performance and improved code quality through best practices
        </p>

        <h3 style={sectionHeadingStyle}>Projects</h3>
        <p style={textStyle}>
          <strong>Portfolio Website</strong><br />
          A modern, responsive portfolio showcasing projects, experience, and skills. Built with React, 
          TypeScript, and Framer Motion for smooth animations and interactions.
        </p>

        <h3 style={sectionHeadingStyle}>Certifications & Achievements</h3>
        <ul style={listStyle}>
          <li>Completed advanced web development courses</li>
          <li>Participated in hackathons and coding competitions</li>
          <li>Contributed to open-source projects</li>
        </ul>
      </div>

      <motion.a
        href="/Yashwant CV.pdf"
        download="Yashwant_Nayak_Resume.pdf"
        style={downloadButtonStyle}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
          background: 'linear-gradient(135deg, #111, #444)'
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <IconDownload />
        Download Resume PDF
      </motion.a>
    </PageWrapper>
  )
}

export default Thoughts
