import React from 'react'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

const MobileOnly: React.FC = () => {
  const handleViewPortfolio = () => {
    alert(
      ' Desktop View Required\n\n' +
      'For the best experience, please view this portfolio on a larger screen.\n\n' +
      ' Options:\n' +
      '1. Open on a laptop or desktop computer\n' +
      '2. Enable "Desktop Mode" in your mobile browser settings\n\n' 
    
    )
  }

  return (
    <div style={styles.container}>
      {/* Phone-sized container */}
      <div style={styles.phoneContainer}>
        <div style={styles.contentWrapper}>
          {/* Profile Image */}
          <div style={styles.profileImage}>
            <img
              src="/mobileimg.png"
              alt="Yashwant Nayak"
              style={styles.img}
            />
          </div>

          {/* Name & Role */}
          <h1 style={styles.name}>Yashwant Nayak</h1>
          <p style={styles.role}>
            Software Engineer
          </p>

          {/* Short Bio */}
          <p style={styles.bio}>
            I work as a Software Engineer, but my skillset goes way beyond just one domain. I'm also a Data Analyst, a Full-Stack Web & App Developer, and a UI/UX Designer who enjoys crafting clean interfaces and smooth user experiences.
          </p>

          {/* Social Links */}
          <div style={styles.socialContainer}>
            <a href="https://github.com/yashwantnayak" target="_blank" rel="noopener noreferrer" style={styles.iconWrapper}>
              <Github style={styles.icon} size={20} />
            </a>
            <a href="https://linkedin.com/in/yashwant-nayak25" target="_blank" rel="noopener noreferrer" style={styles.iconWrapper}>
              <Linkedin style={styles.icon} size={20} />
            </a>
            <a href="https://x.com/Yashwan90253783" target="_blank" rel="noopener noreferrer" style={styles.iconWrapper}>
              <Twitter style={styles.icon} size={20} />
            </a>
            <a href="mailto:yashwantnayak25@gmail.com" style={styles.iconWrapper}>
              <Mail style={styles.icon} size={20} />
            </a>
          </div>

          {/* CTA Button */}
          <Button style={styles.button} onClick={handleViewPortfolio}>
            View Full Portfolio
          </Button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom, #ffffffff, #b0b0b0ff)',
    padding: '16px 12px',
    boxSizing: 'border-box' as const,
  },
  phoneContainer: {
    width: '100%',
    maxWidth: '360px',
    height: '720px',
    maxHeight: '92vh',
    backgroundColor: '#0a0a0aff',
    borderRadius: '2.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 1)',
    border: '5px solid #272727ff',
    overflow: 'hidden' as const,
    boxSizing: 'border-box' as const,
  },
  contentWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    padding: '24px',
    boxSizing: 'border-box' as const,
  },
  profileImage: {
    marginTop: '-85px',
    width: '255px',
    height: '255px',
    display: 'flex',
    marginLeft:'-6px',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginBottom: '32px',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
    filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5))',
  },
  name: {
    fontSize: '2rem',
    fontWeight: 'bold' as const,
    color: 'white',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  role: {
    fontSize: '0.875rem',
    color: '#bababaff',
    marginTop: '4px',
    letterSpacing: '0.04em',
  },
  bio: {
    color: '#8c8c8dff',
    fontSize: '0.875rem',
    marginTop: '14px',
    lineHeight: '1.5',
    maxWidth: '280px',
  },
  socialContainer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '16px',
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    textDecoration: 'none',
  },
  icon: {
    color: '#000000',
  },
  button: {
    marginTop: '26px',
    width: '100%',
    maxWidth: '260px',
    padding: '12px 0',
    borderRadius: '50px',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: '600' as const,
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
}

export default MobileOnly
