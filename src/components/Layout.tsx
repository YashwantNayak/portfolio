import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { palette } from '../theme'

interface LayoutProps {
  children: React.ReactNode
  hideLinkedInSection?: boolean
}

const outerStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: palette.subtle,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '32px 22px 80px'
}

const shellStyle: React.CSSProperties = {
  width: 'min(1200px, 94vw)',
  marginTop: 120,
  display: 'flex',
  gap: 36
}

const contentStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 64
}

const Layout: React.FC<LayoutProps> = ({ children, hideLinkedInSection = false }) => {
  return (
    <div style={outerStyle}>
      <Navbar />
      <div style={{ ...shellStyle, marginTop: hideLinkedInSection ? 100 : 120 }}>
        <main style={contentStyle}>
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default Layout
