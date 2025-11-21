import React from 'react'

interface TypingAnimationProps {
  roles: string[]
  typingSpeed?: number
  deletingSpeed?: number
  holdDelay?: number
  startDelay?: number
  loop?: boolean
  className?: string
  style?: React.CSSProperties
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  roles,
  typingSpeed = 80,
  deletingSpeed = 40,
  holdDelay = 1200,
  startDelay = 400,
  loop = true,
  className = '',
  style = {}
}) => {
  const [displayedText, setDisplayedText] = React.useState('')
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isWaiting, setIsWaiting] = React.useState(true)

  React.useEffect(() => {
    if (isWaiting) {
      const timer = setTimeout(() => setIsWaiting(false), startDelay)
      return () => clearTimeout(timer)
    }

    const currentRole = roles[currentIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayedText === currentRole) {
      timeout = setTimeout(() => {
        if (loop || currentIndex < roles.length - 1) {
          setIsDeleting(true)
        }
      }, holdDelay)
    } else if (isDeleting && displayedText === '') {
      const nextIndex = (currentIndex + 1) % roles.length
      if (!loop && nextIndex === 0) {
        setIsDeleting(false)
        return
      }
      setCurrentIndex(nextIndex)
      setIsDeleting(false)
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed
      timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          if (isDeleting) {
            return currentRole.substring(0, prev.length - 1)
          } else {
            return currentRole.substring(0, prev.length + 1)
          }
        })
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [
    displayedText,
    currentIndex,
    isDeleting,
    isWaiting,
    roles,
    typingSpeed,
    deletingSpeed,
    holdDelay,
    startDelay,
    loop
  ])

  return (
    <span className={className} style={style}>
      {displayedText}
      <span
        style={{
          borderRight: '2px solid currentColor',
          marginLeft: '2px',
          animation: 'blink 1s step-end infinite'
        }}
      >
        &nbsp;
      </span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}

export default TypingAnimation
