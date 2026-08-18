"use client"

import Link from "next/link"
import styles from "./Hero.module.css"
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const openBraceRef = useRef<HTMLSpanElement>(null)
  const closeBraceRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const t = useTranslations('hero')
  const fullText = t('heading')

  console.log(JSON.stringify(fullText))

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    el.textContent = ''

    const tl = gsap.timeline()

    tl.fromTo(
      [openBraceRef.current, closeBraceRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )

    .to({}, {
      duration: fullText.length * 0.13,
      ease: 'none',
      onUpdate() {
        const charIndex = Math.floor(this.progress() * fullText.length)
        el.textContent = fullText.slice(0, charIndex)
      },
    }, '-=0.1')

    .to(
      [openBraceRef.current, closeBraceRef.current],
      { opacity: 0, duration: 0.4, ease: 'power2.in' },
      '+=0.2'
    )

    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  
    .fromTo(buttonRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )

    return () => {
      tl.kill()
      if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
      if (buttonRef.current) gsap.set(buttonRef.current, { opacity: 1, y: 0 })
    }
  }, [])


  return (
    <section className={styles.heroSection}>
        <h2 ref={headingRef} className={styles.name}>
  <span className={styles.nameStart}>
    <span ref={openBraceRef} className={styles.brace}>{`{`}</span>
    <span ref={textRef} className={styles.heroText}></span>
    <span ref={closeBraceRef} className={styles.brace}>{`}`}</span>
  </span>
</h2>
        <p ref={subtitleRef} className={styles.title}>{t('subtitle')}</p>
        <Link ref={buttonRef} href="/#about" className={styles.aboutLink}>{t('button')}</Link>
    </section>
  );
}
