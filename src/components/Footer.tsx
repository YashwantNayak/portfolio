import React from 'react'
import { palette } from '../theme'

const footerStyle: React.CSSProperties = {
  width: '100%',
  padding: '48px 0 32px',
  textAlign: 'center',
  color: 'rgba(0,0,0,0.6)',
  fontSize: 14,
  letterSpacing: 0.4,
  borderTop: `1px solid rgba(0,0,0,0.06)`
}

const Footer: React.FC = () => (
  <footer style={footerStyle}>
    Crafted in the style of sawad.framer — © {new Date().getFullYear()}
  </footer>
)

export default Footer
