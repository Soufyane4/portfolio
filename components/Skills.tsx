import styles from "./Skills.module.css"
import skills from "@/data/skills.json"
import Image from "next/image"

export default function Skills() {

    const skillsElements = skills.map(skill => {
        return(
            <div className={styles.skill} key={skill.name}>
                <Image className={styles.skillIcon} src={`https://skillicons.dev/icons?i=${skill.icon}`} alt={`${skill.name} Icon`} width={48} height={48} unoptimized />
                <p className={styles.skillName}>{skill.name}</p>
            </div>
        )
    })
    return (
        <section className={styles.skillsSection} id="skills">
            <h4 className={styles.skillsHeading}>Some technologies I've worked with:</h4>
            <div className={styles.skillsContainer}>
                {skillsElements}
            </div>
        </section>
    );
}
