import Link from "next/link";
import styles from "./About.module.css";
import RevealOnScroll from "@/animations/RevealOnScroll";
import { getTranslations } from 'next-intl/server'

export default async function About() {
  const t = await getTranslations('about')
  return (
    <RevealOnScroll>
      <section className={styles.aboutSection} id="about">
        <h2 className={styles.aboutHeading}>{t('heading')}</h2>
        <div className={styles.aboutTextContainer}>
          <p className={styles.aboutText}>{t('p1')}</p>
          <p className={styles.aboutText}>
            {t('p2_start')}
            <Link className={styles.aboutLink} href="https://www.um5.ac.ma/um5/">
              {t('p2_link')}
            </Link>
            {t('p2_end')}
          </p>
          <p className={styles.aboutText}>
            {t('p3_start')}
            <Link className={styles.aboutLink} href="https://www.ofppt.ma/fr">
              {t('p3_link')}
            </Link>
            {t('p3_end')}
          </p>
          <p className={styles.aboutText}>{t('p4')}</p>
          <p className={styles.aboutText}>{t('p5')}</p>
        </div>
      </section>
    </RevealOnScroll>
  );
}
