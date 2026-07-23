import Header from "@/components/Header"
import About from "@/components/About"
import Skills from "@/components/Skills"
import styles from "./page.module.css"

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <About />
        <Skills />
      </main>
    </>
  );
}