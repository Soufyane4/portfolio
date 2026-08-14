import Link from "next/link";
import styles from "./About.module.css";
import RevealOnScroll from '@/components/RevealOnScroll'

export default function About() {
  return (
    <RevealOnScroll>
        <section className={styles.aboutSection} id="about"> 
          <h2 className={styles.aboutHeading}>A Little Bit About Me</h2>
          <div className={styles.aboutTextContainer}>
            <p className={styles.aboutText}>
            Hi there! My name is Soufyane, a Full Stack Web Developer from Rabat,
            Morocco.</p>
            <p className={styles.aboutText}>I used to study physical and chemical sciences at <Link className={styles.aboutLink} href="https://www.um5.ac.ma/um5/">Université Mohammed V (UM5)</Link>,
            but I realized early on it wasn't the right direction for me. While finishing the academic year I started learning HTML and CSS on the side.</p>
            <p className={styles.aboutText}>I enrolled at <Link className={styles.aboutLink} href="https://www.ofppt.ma/fr">Centre Mixte de Formation Professionnelle Hay Nahda (CFHN)</Link> vocational training
            school where I graduated as a Fullstack Development Technician, and
            during this period I built a solid foundation in Frontend and Backend technologies.</p>
            
            <p className={styles.aboutText}>What I enjoy most about development is the process of building something
            and watching it work the way it's supposed to. It's genuinely
            satisfying. I'm always open to learning, and I try to learn from people with more experience, there's a lot I don't know yet and I'm fine with
            that.</p>
            <p className={styles.aboutText}>Outside of coding I enjoy watching movies, and lately I've been getting
            into fishing.</p>
          </div>
        </section>
    </RevealOnScroll>
    
  );
}
