import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <section className={styles.footerSection} id="contact">
            <div className={styles.contactBar}>
                <div className={styles.emailContainer}>
                <h6 className={styles.footerHeading}>Let's Build Something Together!</h6>
                <p className={styles.contactText}>Feel free to  get in touch whether you're 
                looking for a developer, have a question, or just want to connect.</p>
                <a className={styles.email} href="mailto:soufianeoubamouh@gmail.com">soufianeoubamouh@gmail.com</a>
            </div>
            <div className={styles.socialsContainer}>
                <a className={styles.socials} href="https://www.linkedin.com/in/soufyane-oubamouh" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a className={styles.socials} href="https://github.com/Soufyane4" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
            </div>
            <h6 className={styles.footerLogo}>{"< SOUF"}<br />{"YANE />"}</h6>
            <p className={styles.copyrightLine}>© {currentYear} Soufyane Oubmaouh</p>
        </section>
    );
}
