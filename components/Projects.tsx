import styles from "./Projects.module.css"
import projects from "@/data/projects.json"
import Image from "next/image"
import Link from "next/link"
import RevealOnScroll from '@/components/RevealOnScroll'

export default function Projects() {

    const projectsElements = projects.map(project => {
        return(
            <div className={styles.projectCard} key={project.id}>
                <Image className={styles.projectImage} src={project.screenshot[0]} alt={`A screenshot of ${project.name} app`} width={260} height={160} unoptimized/>
                <div className={styles.projectDetails}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <Link className={styles.projectLink} href={`projects/${project.id}`}>{"VIEW PROJECT >"}</Link>
                </div>
            </div>
        )
    })
    return (
        <RevealOnScroll>
            <section className={styles.projectsSection} id="projects">
                <h2 className={styles.projectsHeading}>What I've Done</h2>
                <span className={styles.projectsSubheading}>(more coming soon)</span>
                <div className={styles.projectsContainer}>
                    {projectsElements}
                </div>
            </section>
        </RevealOnScroll>
        
    );
}
