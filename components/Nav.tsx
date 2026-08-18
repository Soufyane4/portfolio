"use client"

import Link from "next/link"
import { TbMenuDeep } from "react-icons/tb"
import { useState, useEffect, useRef } from "react"
import styles from "./Nav.module.css"
import gsap from "gsap"
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const isClicking = useRef(false)
  const logoRef = useRef<HTMLHeadingElement>(null)
  const langBtnRef = useRef<HTMLButtonElement>(null)

  const pathname = usePathname()

  const t = useTranslations('nav')

  const locale = useLocale()
  const router = useRouter()

  function toggleLocale() {
    gsap.fromTo(langBtnRef.current,
        { color: '#4830e6' },
        { color: '#E2E3E7', duration: 1.2, ease: 'power2.out' }
      )

    const nextLocale = locale === 'en' ? 'fr' : 'en'
    if (nextLocale === 'en') {
      const newPath = pathname.replace('/fr', '')
      router.push(newPath || '/')
    } else {
      router.push(`/fr${pathname}`)
    }
  }

  const pathnameRef = useRef(pathname)

  useEffect(() => {
    pathnameRef.current = pathname
    if (pathname !== '/' && pathname !== '/fr') {
      setActiveSection(null)
    }
  }, [pathname])

  useEffect(() => {
  const timeout = setTimeout(() => {
    const handleScroll = () => {
      if (pathnameRef.current !== '/' && pathnameRef.current !== '/fr') return
      if (isClicking.current) return

      const sections = document.querySelectorAll('section[id]')
      let closest: string | null = null
      let closestDistance = Infinity

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const distance = Math.abs(rect.top - 100)
        if (distance < closestDistance) {
          closestDistance = distance
          closest = section.id
        }
      })

      const firstSection = sections[0]
      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect()
        if (firstRect.top > window.innerHeight / 2) {
          setActiveSection(null)
          return
        }
      }

      if (closest) setActiveSection(closest)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, 1000)

  return () => clearTimeout(timeout)
}, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function toggleMenu() {
    if (window.innerWidth < 768) {
      setMenuOpen((prev) => !prev)
    }
  }

  useEffect(() => {
    if (!logoRef.current) return
    const spans = logoRef.current.querySelectorAll("span")

    const tl = gsap.timeline({ delay: 3.8 })

    const colors = ["#4830e6", "inherit"]

    colors.forEach((color) => {
      tl.to(spans, {
        color,
        duration: 0.4,
        stagger: { each: 0.03 },
        ease: "power2.inOut",
      })
    })
  }, [])

  function handleNavClick(targetId: string) {
    isClicking.current = true
    setActiveSection(targetId)
    setTimeout(() => (isClicking.current = false), 1000)
    toggleMenu()
    }


  return (
    <nav className={styles.nav}>
      <button ref={langBtnRef} className={styles.langBtn} onClick={toggleLocale}>
        {locale === 'en' ? 'FR' : 'EN'}
      </button>
      <h1 ref={logoRef} className={styles.logo}>
        <Link href={locale === 'fr' ? '/fr' : '/'}>
          {"< SOUF".split("").map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
          <br />
          {"YANE />".split("").map((char, i) => (
            <span key={i + 10}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </Link>
      </h1>
      <button className={styles.menutoggle} onClick={toggleMenu}>
        <TbMenuDeep size={44} />
      </button>

      <ul
        className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}
      >
        <li
          className={`${styles.navLink} ${activeSection === "about" ? styles.activeLink : ""}`}
        >
          <Link href={`${locale === 'en' ? '' : '/fr'}/#about`} onClick={() => handleNavClick('about')}>{t('about')}</Link>
        </li>
        <li
          className={`${styles.navLink} ${activeSection === "skills" ? styles.activeLink : ""}`}
        >
         <Link href={`${locale === 'en' ? '' : '/fr'}/#skills`} onClick={() => handleNavClick('skills')}>{t('skills')}</Link>
        </li>
        <li
          className={`${styles.navLink} ${activeSection === "projects" ? styles.activeLink : ""}`}
        >
          <Link href={`${locale === 'en' ? '' : '/fr'}/#projects`} onClick={() => handleNavClick('projects')}>{t('projects')}</Link>
        </li>
        <li
          className={`${styles.navLink} ${activeSection === "contact" ? styles.activeLink : ""}`}
        >
          <Link href={`${locale === 'en' ? '' : '/fr'}/#contact`} onClick={() => handleNavClick('contact')}>{t('contact')}</Link>
        </li>
      </ul>
    </nav>
  )
}
