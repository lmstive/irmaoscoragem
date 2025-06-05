// components/Footer.js
import styles from './Footer.module.css'; // Vamos criar este arquivo CSS

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Irmãos Coragem. Eu bebo sim, estou vivendo... tem gente que não bebe e está morrendo!</p>
      <p className={styles.credits}>
        Cascavel - PR.
      </p>
    </footer>
  );
}