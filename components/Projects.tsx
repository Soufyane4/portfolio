import styles from "./Projects.module.css";
import projects from "@/data/en/projects.json";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/animations/RevealOnScroll";
import { getTranslations, getLocale } from 'next-intl/server'

type Project = {
  id: string
  name: string
  description: string
  screenshot: string[]
  liveDemo: string
  github: string
  techStack: string[]
  summary: string
  purpose: string
  spotlight: string
  lessonsLearned: string
}

export default async function Projects() {
  const t = await getTranslations('projects')
  const locale = await getLocale()

  const projects = (await import(`@/data/${locale}/projects.json`)).default
  
  const projectsElements = projects.map((project: Project) => {
    return (
      <div className={styles.projectCard} key={project.id}>
        <Image
          className={styles.projectImage}
          src={project.screenshot[0]}
          alt={`A screenshot of ${project.name} app`}
          width={260}
          height={160}
          unoptimized
        />
        <div className={styles.projectDetails}>
          <h3 className={styles.projectName}>{project.name}</h3>
          <p className={styles.projectDescription}>{project.description}</p>
          <Link className={styles.projectLink} href={`${locale === 'fr' ? '/fr' : ''}/projects/${project.id}`}>
            {t('viewProject')}
          </Link>
        </div>
      </div>
    )
  })

  return (
    <RevealOnScroll>
      <section className={styles.projectsSection} id="projects">
        <h2 className={styles.projectsHeading}>{t('heading')}</h2>
        <span className={styles.projectsSubheading}>({t('subheading')})</span>
        <div className={styles.projectsContainer}>{projectsElements}</div>
      </section>
    </RevealOnScroll>
  )
}
