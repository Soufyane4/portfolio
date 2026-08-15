"use client"

import Link from "next/link"
import { TbMenuDeep } from "react-icons/tb"
import { useState, useEffect, useRef } from "react"
import styles from "./Nav.module.css"
import gsap from "gsap"
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isClicking = useRef(false);
  const logoRef = useRef<HTMLHeadingElement>(null);

  const pathname = usePathname()

  const t = useTranslations('nav')

  useEffect(() => {
    setTimeout(() => {
      const sections = document.querySelectorAll("section[id]");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isClicking.current && pathname === '/') {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0, rootMargin: "-45% 0px -45% 0px" },
      );

      sections.forEach((section) => observer.observe(section));
      return () => {
        sections.forEach((section) => observer.unobserve(section));
      };
    }, 1000);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleMenu() {
    if (window.innerWidth < 768) {
      setMenuOpen((prev) => !prev);
    }
  }

  useEffect(() => {
    if (!logoRef.current) return;
    const spans = logoRef.current.querySelectorAll("span");

    const tl = gsap.timeline({ delay: 3.8 });

    const colors = ["#4830e6", "inherit"];

    colors.forEach((color) => {
      tl.to(spans, {
        color,
        duration: 0.4,
        stagger: { each: 0.03 },
        ease: "power2.inOut",
      });
    });
  }, []);

  function handleNavClick(targetId: string) {
    isClicking.current = true
    setActiveSection(targetId)
    setTimeout(() => (isClicking.current = false), 1000)
    toggleMenu()
    }

    useEffect(() => {
    if (pathname !== '/') {
        setActiveSection(null)
    }
    }, [pathname])

  return (
    <nav className={styles.nav}>
      <button className={styles.langBtn}>FR</button>
      <h1 ref={logoRef} className={styles.logo}>
        <Link href="/">
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
          <Link href="/#about" onClick={() => handleNavClick('about')}>{t('about')}</Link>
        </li>
        <li
          className={`${styles.navLink} ${activeSection === "skills" ? styles.activeLink : ""}`}
        >
         <Link href="/#skills" onClick={() => handleNavClick('skills')}>{t('skills')}</Link>
        </li>
        <li
          className={`${styles.navLink} ${activeSection === "projects" ? styles.activeLink : ""}`}
        >
          <Link href="/#projects" onClick={() => handleNavClick('projects')}>{t('projects')}</Link>
        </li>
        <li
          className={`${styles.navLink} ${activeSection === "contact" ? styles.activeLink : ""}`}
        >
          <Link href="/#contact" onClick={() => handleNavClick('contact')}>{t('contact')}</Link>
        </li>
      </ul>
    </nav>
  );
}
