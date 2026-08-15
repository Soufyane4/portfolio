"use client"

import { useEffect } from 'react'

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      '%c👋 Hey there, fellow developer!',
      'color: #4830e6; font-size: 1.2rem; font-weight: bold;'
    )
    console.log(
  '%cCurious about how this was built?\n\n→ https://github.com/Soufyane4/portfolio',
  'color: #a78bfa; font-size: 0.9rem;'
)
  }, [])

  return null
}