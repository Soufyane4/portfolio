import Link from "next/link";
import styles from "./Footer.module.css";
import RevealOnScroll from "@/animations/RevealOnScroll"
import { getTranslations } from 'next-intl/server'

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const t = await getTranslations('contact')

  return (
    <RevealOnScroll>
      <section className={styles.footerSection} id="contact">
        <div className={styles.contactBar}>
          <div className={styles.emailContainer}>
            <h2 className={styles.footerHeading}>{t('heading')}</h2>
            <p className={styles.contactText}>{t('paragraph')}</p>
            <a
              className={styles.email}
              href="mailto:soufianeoubamouh@gmail.com"
            >
              soufianeoubamouh@gmail.com
            </a>
          </div>
          <div className={styles.socialsContainer}>
            <a
              className={styles.socials}
              href="https://www.linkedin.com/in/soufyane-oubamouh"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <span className={styles.arrow}>↗</span>
            </a>
            <a
              className={styles.socials}
              href="https://github.com/Soufyane4"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span className={styles.arrow}>↗</span>
            </a>
          </div>
        </div>
        <h3 className={styles.footerLogo}>
          {"< SOUF"}
          <br />
          {"YANE />"}
        </h3>
        <p className={styles.copyrightLine}>
          © {currentYear} Soufyane Oubmaouh
        </p>
      </section>
    </RevealOnScroll>
  );
}
