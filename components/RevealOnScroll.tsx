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

  gsap.set(el, { opacity: 0, y: 40 })

  const anim = gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      }
    }
  )

  return () => {
    anim.kill()
    gsap.set(el, { opacity: 1, y: 0 })
    ScrollTrigger.getAll()
        .filter(t => t.trigger === el)
        .forEach(t => t.kill())
    }
}, [])

  return <div ref={ref}>{children}</div>
}