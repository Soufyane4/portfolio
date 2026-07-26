"use client"

import Link from "next/link"
import { TbMenuDeep } from "react-icons/tb"
import { useState } from "react"
import styles from "./Nav.module.css"


export default function Nav() {   

    const [menuOpen, setMenuOpen] = useState(false)

    function toggleMenu() {
        if (window.innerWidth < 768) {
            setMenuOpen(prev => !prev)
        }
    }

    return(
        <nav className={styles.nav}>
            <button className={styles.langBtn}>FR</button>
            <h1 className={styles.logo}><Link href="/">{"< SOUF"}<br />{"YANE />"}</Link></h1>
            <button className={styles.menutoggle} onClick={toggleMenu}><TbMenuDeep size={44}/></button>

            <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
                <li className={styles.navLink}><Link href="/#about" onClick={toggleMenu}>About</Link></li>
                <li className={styles.navLink}><Link href="/#skills" onClick={toggleMenu}>Skills</Link></li>
                <li className={styles.navLink}><Link href="/#projects" onClick={toggleMenu}>Projects</Link></li>
                <li className={styles.navLink}><Link href="/#contact" onClick={toggleMenu}>Contact</Link></li>
            </ul>
        </nav>
    )
}