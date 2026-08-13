"use client"

import Link from "next/link"
import { TbMenuDeep } from "react-icons/tb"
import { useState, useEffect, useRef } from "react"
import styles from "./Nav.module.css"
import gsap from 'gsap'


export default function Nav() {   

    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const isClicking = useRef(false)
    const logoRef = useRef<HTMLHeadingElement>(null)

    useEffect(()=> {
        console.log('useEffect ran')
        setTimeout(()=> {
            const sections = document.querySelectorAll('section[id]')
            console.log(sections)
            const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log(entry.target.id, entry.isIntersecting)
                if (entry.isIntersecting && !isClicking.current) {
                    setActiveSection(entry.target.id)
                    console.log(activeSection)
                }
            })
            
        }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' })

        sections.forEach(section => observer.observe(section))
        return () => {
            sections.forEach(section => observer.unobserve(section))
        }  
        }, 1000)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function toggleMenu() {
        if (window.innerWidth < 768) {
            setMenuOpen(prev => !prev)
        }
    }

    useEffect(() => {
    if (!logoRef.current) return
    const spans = logoRef.current.querySelectorAll('span')

    const tl = gsap.timeline({ delay: 3.8 })

    const colors = ['#4830e6', 'inherit']

    colors.forEach((color) => {
        tl.to(spans, {
        color,
        duration: 0.4,
        stagger: { each: 0.03 },
        ease: 'power2.inOut', 
        })
    })
    }, [])

    return(
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
            <button className={styles.menutoggle} onClick={toggleMenu}><TbMenuDeep size={44}/></button>

            <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
                <li className={`${styles.navLink} ${activeSection === 'about' ? styles.activeLink : ''}`}><Link href="/#about" onClick={() => { isClicking.current = true; setActiveSection('about'); setTimeout(() => isClicking.current = false, 1000); toggleMenu() }}>About</Link></li>
                <li className={`${styles.navLink} ${activeSection === 'skills' ? styles.activeLink : ''}`}><Link href="/#skills" onClick={() => { isClicking.current = true; setActiveSection('skills'); setTimeout(() => isClicking.current = false, 1000); toggleMenu() }}>Skills</Link></li>
                <li className={`${styles.navLink} ${activeSection === 'projects' ? styles.activeLink : ''}`}><Link href="/#projects" onClick={() => { isClicking.current = true; setActiveSection('projects'); setTimeout(() => isClicking.current = false, 1000); toggleMenu() }}>Projects</Link></li>
                <li className={`${styles.navLink} ${activeSection === 'contact' ? styles.activeLink : ''}`}><Link href="/#contact" onClick={() => { isClicking.current = true; setActiveSection('contact'); setTimeout(() => isClicking.current = false, 1000); toggleMenu() }}>Contact</Link></li>
            </ul>
        </nav>
    )
}