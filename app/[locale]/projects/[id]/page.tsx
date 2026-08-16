import { getTranslations, getLocale } from 'next-intl/server'
import styles from "./page.module.css"
import Image from "next/image"
import Link from "next/link"

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

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const locale = await getLocale()
  const t = await getTranslations('projectDetail')

  const projects: Project[] = (await import(`@/data/${locale}/projects.json`)).default
  const project = projects.find(p => p.id === id)

  if (!project) return <p className={styles.notFoundProject}>Project not found</p>

  const techStack = project.techStack.map(tech => <span key={tech} className={styles.tech}>{tech}</span>)
  const otherProjects = projects.filter(p => p.id !== project.id)

  const otherProjectsElements = otherProjects.map(project => (
    <div className={styles.otherProjectCard} key={project.id}>
      <Image className={styles.otherProjectImage} src={project.screenshot[0]} alt={`A screenshot of ${project.name} app`} width={260} height={160} unoptimized/>
      <div className={styles.otherProjectDetails}>
        <h3 className={styles.otherProjectName}>{project.name}</h3>
        <p className={styles.otherProjectDescription}>{project.description}</p>
        <Link className={styles.otherProjectLink} href={`${locale === 'fr' ? '/fr' : ''}/projects/${project.id}`}>
          {t('viewProject')}
        </Link>
      </div>
    </div>
  ))

  return (
    <main className={styles.main}>
      <section className={styles.summarySection}>
        <h2 className={styles.projectName}>{project.name}</h2>
        <p className={styles.projectSummay}>{project.summary}</p>
        <div className={styles.projectLinksContainer}>
          <a className={styles.projectLink} href={project.liveDemo} target="_blank" rel="noopener noreferrer">{t('liveDemo')} <span className={styles.arrow}>↗</span></a>
          <a className={styles.projectLink} href={project.github} target="_blank" rel="noopener noreferrer">{t('github')} <span className={styles.arrow}>↗</span></a>
        </div>
        <div className={styles.techStack}>{techStack}</div>
        <Image className={styles.projectImage} src={project.screenshot[1]} alt={`A screenshot of ${project.name} app`} width={260} height={160} unoptimized/>
      </section>
      <section className={styles.purposeSection}>
        <h2 className={styles.projectHeading}>{t('purpose')}</h2>
        <p className={styles.projectPurpose}>{project.purpose}</p>
      </section>
      <section className={styles.spotlightSection}>
        <h2 className={styles.projectHeading}>{t('spotlight')}</h2>
        <p className={styles.projectSpotlight}>{project.spotlight}</p>
      </section>
      <section className={styles.lessonsSection}>
        <h2 className={styles.projectHeading}>{t('lessonsLearned')}</h2>
        <p className={styles.projectLessons}>{project.lessonsLearned}</p>
      </section>
      <section className={styles.otherProjectsSection}>
        <h2 className={styles.projectHeading}>{t('otherProjects')}</h2>
        <div className={styles.projectsContainer}>
          {otherProjectsElements}
        </div>
      </section>
    </main>
  )
}