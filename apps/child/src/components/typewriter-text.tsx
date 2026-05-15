'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterText({ text, speed = 30, delay = 0, className = '', onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    let i = 0
    setDisplayText('') // Reset if text changes

    const intervalId = setInterval(() => {
      setDisplayText(text.substring(0, i + 1))
      i++

      if (i >= text.length) {
        clearInterval(intervalId)
        if (onComplete) onComplete()
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, speed, isStarted, onComplete])

  return <span className={className}>{displayText}</span>
}
