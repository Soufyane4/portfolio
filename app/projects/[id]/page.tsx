import projects from "@/data/projects.json"
import styles from "./page.module.css"
import Image from "next/image"
import Link from "next/link"


export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const project = projects.find(p => p.id === id)

  if (!project) return <p className={styles.notFoundProject}>Project not found</p>

  const techStack = project?.techStack.map(tech => <span key={tech} className={styles.tech}>{tech}</span>)
  const otherProjects = projects.filter(p => p.id !== project.id)

  const otherProjectsElements = otherProjects.map(project => {
    return(
            <div className={styles.otherProjectCard} key={project.id}>
                <Image className={styles.otherProjectImage} src={project.screenshot[0]} alt={`A screenshot of ${project.name} app`} width={260} height={160} unoptimized/>
                <div className={styles.otherProjectDetails}>
                    <h3 className={styles.otherProjectName}>{project.name}</h3>
                    <p className={styles.otherProjectDescription}>{project.description}</p>
                    <Link className={styles.otherProjectLink} href={`/projects/${project.id}`}>{"VIEW PROJECT >"}</Link>
                </div>
            </div>
        )
  })
  
  return (
    <main className={styles.main}>
        <section className={styles.summarySection}>
            <h2 className={styles.projectName}>{project?.name}</h2>
            <p className={styles.projectSummay}>{project?.summary}</p>
            <div className={styles.projectLinksContainer}>
                <a className={styles.projectLink} href={project?.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo <span className={styles.arrow}>↗</span></a>
                <a className={styles.projectLink} href={project?.github} target="_blank" rel="noopener noreferrer">GitHub <span className={styles.arrow}>↗</span></a>
            </div>
            <div className={styles.techStack}>{techStack}</div>
            <Image className={styles.projectImage} src={project.screenshot[1]} alt={`A screenshot of ${project?.name} app`} width={260} height={160} unoptimized/>
        </section>
        <section className={styles.purposeSection}>
          <h2 className={styles.projectHeading}>Project Purpose and Goal</h2>
          <p className={styles.projectPurpose}>{project.purpose}</p>
        </section>
        <section className={styles.spotlightSection}>
          <h2 className={styles.projectHeading}>Spotlight</h2>
          <p className={styles.projectSpotlight}>{project.spotlight}</p>
        </section>
        <section className={styles.lessonsSection}>
          <h2 className={styles.projectHeading}>Lessons Learned</h2>
          <p className={styles.projectLessons}>{project.lessonsLearned}</p>
        </section>
        <section className={styles.otherProjectsSection}>
          <h2 className={styles.projectHeading}>Other Projects</h2>
          <div className={styles.projectsContainer}>
            {otherProjectsElements}
          </div>
        </section>
    </main>
  )
}