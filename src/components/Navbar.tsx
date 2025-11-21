import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const baseIconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
}

const IconHome = () => (
  <svg {...baseIconProps}>
    <path d="M4.5 10.5 12 4l7.5 6.5" />
    <path d="M6.5 10.5v9h11v-9" />
    <path d="M10.5 19v-4.3h3v4.3" />
  </svg>
)

const IconFolder = () => (
  <svg {...baseIconProps}>
    <path d="M3.5 8.5h5.2l2 2.2H20.5v7.5a1.8 1.8 0 0 1-1.8 1.8H5.3A1.8 1.8 0 0 1 3.5 18V8.5z" />
    <path d="M20.5 10.7H10.7" />
  </svg>
)

const IconBriefcase = () => (
  <svg {...baseIconProps}>
    <path d="M8.5 6.5v-1.4h7v1.4" />
    <rect x="3.5" y="6.5" width="17" height="12" rx="2.2" />
    <path d="M3.5 12.5h17" />
    <path d="M12 12.5v2.1" />
  </svg>
)

const IconWrench = () => (
  <svg {...baseIconProps}>
    <path d="M14.8 4.5a4.3 4.3 0 0 1-5.4 5.4l-4 4a2.3 2.3 0 1 0 3.2 3.2l4-4a4.3 4.3 0 0 1 5.5-5.4 3.4 3.4 0 0 0-3.3-3.2z" />
    <circle cx="16.6" cy="7.4" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const IconPencil = () => (
  <svg {...baseIconProps}>
    <path d="M15.4 5.4 18.6 8.6 8.6 18.6 5 19l0.4-3.6 10-10z" />
    <path d="M13.3 7.6 16.4 10.7" />
  </svg>
)

const IconSpark = () => (
  <svg {...baseIconProps}>
    <path d="M12 3v4" />
    <path d="M12 17v4" />
    <path d="m5.6 5.6 2.8 2.8" />
    <path d="m15.6 15.6 2.8 2.8" />
    <path d="M3 12h4" />
    <path d="M17 12h4" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
)

type LinkConfig = {
  label: string
  icon: React.ReactElement
  targetId?: string
  route?: string
  activeKey: string
}

const linkNames: LinkConfig[] = [
  { label: 'Home', targetId: 'home', activeKey: 'home', icon: <IconHome /> },
  { label: 'Projects', targetId: 'projects', activeKey: 'projects', icon: <IconFolder /> },
  { label: 'Experience', targetId: 'experience', activeKey: 'experience', icon: <IconBriefcase /> },
  { label: 'Tools', targetId: 'tools', activeKey: 'tools', icon: <IconWrench /> },
  { label: 'Thoughts', route: '/thoughts', activeKey: '/thoughts', icon: <IconPencil /> },
  { label: "Let's Work", route: '/contact', activeKey: '/contact', icon: <IconSpark /> }
]

const navContainer: React.CSSProperties = {
  position: 'fixed',
  top: 30,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 70,
  display: 'flex',
  gap: 18,
  padding: '14px 26px',
  borderRadius: 999,
  background: 'rgba(10,10,10,0.92)',
  border: '1px solid rgba(255,255,255,0.05)',
  boxShadow: '0 25px 45px rgba(0,0,0,0.55)',
  backdropFilter: 'blur(18px)'
}

const iconWrapper: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const tooltipStyle: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 10px)',
  left: '50%',
  padding: '6px 10px',
  borderRadius: 999,
  background: 'rgba(8,8,8,0.95)',
  color: '#fff',
  fontSize: 11,
  letterSpacing: 0.6,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
  transform: 'translate(-50%, -6px)',
  opacity: 0,
  transition: 'opacity 0.25s ease, transform 0.25s ease'
}

const iconButtonStyle: React.CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255,255,255,0.02)',
  color: '#fff',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: 'border 0.3s ease, background 0.3s ease, transform 0.2s ease'
}

const Navbar: React.FC = () => {
  const [visibleTooltip, setVisibleTooltip] = React.useState<string | null>(null)
  const [activeKey, setActiveKey] = React.useState<string>('home')
  const [pendingSection, setPendingSection] = React.useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const scrollToSection = React.useCallback((targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleNavClick = (item: LinkConfig) => {
    if (item.targetId) {
      if (isHome) {
        scrollToSection(item.targetId)
        setActiveKey(item.activeKey)
      } else {
        setPendingSection(item.targetId)
        navigate('/')
      }
    } else if (item.route) {
      navigate(item.route)
      setActiveKey(item.activeKey)
    }
  }

  React.useEffect(() => {
    if (!isHome) {
      setActiveKey(location.pathname)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveKey(entry.target.id)
          }
        })
      },
      { threshold: 0.35 }
    )

    linkNames.forEach(({ targetId }) => {
      if (!targetId) return
      const section = document.getElementById(targetId)
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [isHome, location.pathname])

  React.useEffect(() => {
    if (isHome && pendingSection) {
      const timeout = window.setTimeout(() => {
        scrollToSection(pendingSection)
        setActiveKey(pendingSection)
        setPendingSection(null)
      }, 120)
      return () => window.clearTimeout(timeout)
    }
    if (!isHome) {
      setPendingSection(null)
    }
    return undefined
  }, [isHome, pendingSection, scrollToSection])

  return (
    <nav style={navContainer}>
      {linkNames.map((item) => (
        <div
          key={item.activeKey}
          style={iconWrapper}
          onMouseEnter={() => setVisibleTooltip(item.label)}
          onMouseLeave={() => setVisibleTooltip(null)}
        >
          <button
            type="button"
            aria-label={item.label}
            onClick={() => handleNavClick(item)}
            onFocus={() => setVisibleTooltip(item.label)}
            onBlur={() => setVisibleTooltip(null)}
            style={{
              ...iconButtonStyle,
              background:
                activeKey === item.activeKey
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(255,255,255,0.02)',
              transform: activeKey === item.activeKey ? 'translateY(-2px)' : 'none',
              boxShadow: activeKey === item.activeKey ? '0 12px 30px rgba(0,0,0,0.55)' : 'none'
            }}
          >
            <span>{item.icon}</span>
          </button>
          <span
            style={{
              ...tooltipStyle,
              opacity: visibleTooltip === item.label ? 1 : 0,
              transform:
                visibleTooltip === item.label
                  ? 'translate(-50%, 0)'
                  : 'translate(-50%, -6px)'
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  )
}

export default Navbar
