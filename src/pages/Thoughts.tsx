import React from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { palette, shadows } from '../theme'

const containerStyle: React.CSSProperties = {
  maxWidth: 900,
  margin: '0 auto',
  padding: '40px 32px',
  borderRadius: 24,
  background: 'linear-gradient(145deg,#fff,#f7f7f7)',
  border: '1px solid rgba(0,0,0,0.08)',
  boxShadow: shadows.soft
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 48,
  padding: 32,
  borderRadius: 16,
  background: '#fff',
  border: '1px solid rgba(0,0,0,0.06)'
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 600,
  marginBottom: 24,
  color: palette.text,
  letterSpacing: -0.5
}

const educationItemStyle: React.CSSProperties = {
  marginBottom: 24,
  paddingBottom: 24,
  borderBottom: '1px solid rgba(0,0,0,0.06)'
}

const experienceItemStyle: React.CSSProperties = {
  marginBottom: 32,
  paddingBottom: 32,
  borderBottom: '1px solid rgba(0,0,0,0.06)'
}

const institutionStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: palette.text,
  marginBottom: 4
}

const degreeStyle: React.CSSProperties = {
  fontSize: 15,
  color: palette.muted,
  marginBottom: 4
}

const dateStyle: React.CSSProperties = {
  fontSize: 13,
  color: 'rgba(0,0,0,0.45)',
  fontStyle: 'italic'
}

const companyStyle: React.CSSProperties = {
  fontSize: 19,
  fontWeight: 600,
  color: palette.text,
  marginBottom: 4
}

const positionStyle: React.CSSProperties = {
  fontSize: 16,
  color: palette.muted,
  marginBottom: 8
}

const bulletStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: 'rgba(0,0,0,0.7)',
  marginLeft: 20,
  marginBottom: 6
}

const buttonRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  marginBottom: 48,
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const buttonStyle: React.CSSProperties = {
  borderRadius: 999,
  padding: '16px 40px',
  fontSize: 16,
  letterSpacing: 0.5,
  border: 'none',
  cursor: 'pointer',
  transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
  fontFamily: 'inherit',
  fontWeight: 500
}

const Thoughts: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Yashwant_Nayak_Resume.pdf'
    link.click()
  }

  return (
    <PageWrapper
      sectionId="resume"
      title="Resume"
      subtitle="Software Engineer specializing in Full-Stack Development, Data Engineering, and AI-driven solutions."
    >
      <div style={containerStyle}>
        <motion.div
          style={buttonRowStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            style={{
              ...buttonStyle,
              background: palette.text,
              color: '#fff',
              boxShadow: shadows.hover
            }}
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📥 Download CV
          </motion.button>
        </motion.div>

        {/* Education Section */}
        <motion.div
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 style={sectionTitleStyle}>📚 Education</h3>
          
          <div style={educationItemStyle}>
            <div style={institutionStyle}>Shirmati College of Management and Information Technology</div>
            <div style={degreeStyle}>Bachelor of Science in Computer Science and Information Technology (Bsc CSIT)</div>
            <div style={dateStyle}>2021 — 2025</div>
          </div>

          <div style={{...educationItemStyle, borderBottom: 'none', marginBottom: 0, paddingBottom: 0}}>
            <div style={institutionStyle}>Kendriya International College</div>
            <div style={degreeStyle}>+2 Science</div>
            <div style={dateStyle}>2018 — 2020</div>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 style={sectionTitleStyle}>💼 Experience</h3>
          
          <div style={experienceItemStyle}>
            <div style={companyStyle}>Python Developer</div>
            <div style={positionStyle}>Cybrom Technology — Full Time</div>
            <div style={dateStyle}>Feb, 2025 — Present · 10 mos</div>
            <ul style={{margin: '12px 0 0 0', padding: 0}}>
              <li style={bulletStyle}>Building efficient backend systems using Python and Flask</li>
              <li style={bulletStyle}>Developing mobile applications using UI Path</li>
            </ul>
          </div>

          <div style={experienceItemStyle}>
            <div style={companyStyle}>MIS Local Bodies Developer</div>
            <div style={positionStyle}>Tatva Global, Raipur — Full Time</div>
            <div style={dateStyle}>Aug, 2024 — Jan, 2025 · 7 mos</div>
            <ul style={{margin: '12px 0 0 0', padding: 0}}>
              <li style={bulletStyle}>Developed comprehensive MIS platforms with cookie-less features</li>
              <li style={bulletStyle}>Implemented Google and Facebook login; file, user authentication</li>
              <li style={bulletStyle}>Built CRUD application and integrated data analytics dashboards</li>
              <li style={bulletStyle}>Created event pages and implemented time-based data upload functionality</li>
              <li style={bulletStyle}>Collaborated with designers and backend team for API integration</li>
              <li style={bulletStyle}>Ensured cross-browser compatibility, responsiveness, and performance optimization</li>
              <li style={bulletStyle}>Performed code reviews and deployed the app in Flipdocs and upzmine</li>
            </ul>
          </div>

          <div style={experienceItemStyle}>
            <div style={companyStyle}>Full Stack Developer</div>
            <div style={positionStyle}>Conative IT Solutions, Raipur — Full Time · 6 Months</div>
            <div style={dateStyle}>July, 2023 — Aug, 2024 · 1 yr 1 mos</div>
            <ul style={{margin: '12px 0 0 0', padding: 0}}>
              <li style={bulletStyle}>Designed and developed UI designs with fully functional web prototypes</li>
              <li style={bulletStyle}>Developed admin portal for Bharat Plus app</li>
              <li style={bulletStyle}>Implemented payment and item-filter actions, the secure user workflows interactively</li>
              <li style={bulletStyle}>Assisted team member and clients with development challenges</li>
              <li style={bulletStyle}>Developed payment action-filter actions, the secure user workflows interactively</li>
              <li style={bulletStyle}>Implemented payment and item-filter actions, the secure user workflows interactively</li>
              <li style={bulletStyle}>Collaborated with designers and backend team for API integration and deploying faster</li>
              <li style={bulletStyle}>Performed code reviews and deployed the app in Flipdocs and upzmine</li>
            </ul>
          </div>

          <div style={{...experienceItemStyle, borderBottom: 'none', marginBottom: 0, paddingBottom: 0}}>
            <div style={companyStyle}>MERN Stack Intern</div>
            <div style={positionStyle}>Internship|Raipur</div>
            <div style={dateStyle}>May, 2023 — Sep, 2023 · 5 mos</div>
            <ul style={{margin: '12px 0 0 0', padding: 0}}>
              <li style={bulletStyle}>Understood React, Node.js and created simple Elifter applications, executing seamless functionality</li>
              <li style={bulletStyle}>Supported team members with development help</li>
              <li style={bulletStyle}>Designed API structure for educational web application</li>
              <li style={bulletStyle}>Acquired diverse team and industry perspectives using cutting-edge technologies for an</li>
              <li style={bulletStyle}>Gained different team, industry perspectives using cutting-edge tech because one</li>
              <li style={bulletStyle}>Acquired valuable team, industry perspectives using cutting-edge technologies</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}

export default Thoughts
