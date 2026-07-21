import Hero from "@/components/Hero"
import styles from "./Header.module.css"


export default function Header() {
    return(
        <header className={styles.header}>
            <Hero />
        </header>
    )
}