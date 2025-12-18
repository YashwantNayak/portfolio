import React from 'react'

interface SocialLink {
  name: string
  url: string
  icon: React.ReactNode
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yashwantnayak',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yashwantnayak',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    )
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yashwantnayak',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'Email',
    url: 'mailto:yashwant@example.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  }
]

const footerStyle: React.CSSProperties = {
  width: '100%',
  padding: '48px 0 32px',
  borderTop: '1px solid rgba(0,0,0,0.06)',
  marginTop: 64
}

const contentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  alignItems: 'center'
}

const socialRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  justifyContent: 'center',
  flexWrap: 'wrap'
}

const socialLinkStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  border: '1px solid rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  background: '#fff'
}

const copyrightStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'rgba(0,0,0,0.6)',
  fontSize: 14,
  letterSpacing: 0.4
}

const Footer: React.FC = () => (
  <footer style={footerStyle}>
    <div style={contentStyle}>
      <div style={socialRowStyle}>
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={socialLinkStyle}
            aria-label={link.name}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.color = '#000'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p style={copyrightStyle}>
        Crafted with passion — © {new Date().getFullYear()} Yashwant Nayak
      </p>
    </div>
  </footer>
)

export default Footer
