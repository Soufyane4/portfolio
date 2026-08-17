import styles from "./Skills.module.css"
import skills from "@/data/skills.json"
import Image from "next/image"
import RevealOnScroll from "@/animations/RevealOnScroll"
import { getTranslations } from 'next-intl/server'

export default async function Skills() {
  const t = await getTranslations('skills')
  const skillsElements = skills.map((skill) => {
    return (
      <div className={styles.skill} key={skill.name}>
        <Image
          className={styles.skillIcon}
          src={`https://skillicons.dev/icons?i=${skill.icon}`}
          alt={`${skill.name} Icon`}
          width={48}
          height={48}
          unoptimized
        />
        <p className={styles.skillName}>{skill.name}</p>
      </div>
    )
  })
  return (
    <RevealOnScroll>
      <section className={styles.skillsSection} id="skills">
        <h2 className={styles.skillsHeading}>{t('heading')}</h2>
        <div className={styles.skillsContainer}>{skillsElements}</div>
      </section>
    </RevealOnScroll>
  )
}
