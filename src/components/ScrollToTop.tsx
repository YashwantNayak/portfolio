import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Don't scroll to top if we're on the home page and there's a hash (handled by Navbar)
    // But wait, we don't use hashes in the URL for sections in this app, we use state in Navbar.
    // So we can just scroll to top on every route change.
    // However, if we are navigating to '/' with a pending section, Navbar handles it.
    // If we scroll to top here, it might be jarring or conflict?
    // Actually, scrolling to top first is good, then Navbar scrolls to section.
    
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
