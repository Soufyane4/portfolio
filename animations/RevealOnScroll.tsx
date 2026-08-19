"use client"


import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
  const el = ref.current
  if (!el) return

  gsap.set(el, { opacity: 0, y: 40, pointerEvents: 'none' })

  const anim = gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => gsap.set(el, { pointerEvents: 'auto' }),
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      }
    }
  )

  const timeout = setTimeout(() => {
    ScrollTrigger.refresh()
  }, 500)

  window.addEventListener('load', () => ScrollTrigger.refresh())

  return () => {
    clearTimeout(timeout)
    anim.kill()
    gsap.set(el, { opacity: 1, y: 0, pointerEvents: 'auto' })
    ScrollTrigger.getAll()
      .filter(t => t.trigger === el)
      .forEach(t => t.kill())
  }
}, [])

  return <div ref={ref}>{children}</div>
}