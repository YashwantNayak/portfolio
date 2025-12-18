import React, { useEffect, useState } from 'react'
import DesktopApp from './components/DesktopApp'
import MobileOnly from './components/MobileOnly'

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)

    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return isMobile ? <MobileOnly /> : <DesktopApp />
}

export default App
