import Link from "next/link"
import styles from "./Hero.module.css"


export default function Hero() {
  return (
    <section className={styles.heroSection}>
        <h2 className={styles.name}>HI, I'M SOUFYANE</h2>
        <p className={styles.title}>Full Stack Developer</p>
        <Link href="/#about" className={styles.aboutLink}>SEE MORE</Link>
    </section>
  );
}
