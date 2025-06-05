// components/Footer.js
import styles from './Footer.module.css'; // Vamos criar este arquivo CSS

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Irmãos Coragem. A amizade é a nossa maior aventura!</p>
      <p className={styles.credits}>
        Cascavel - PR.
      </p>
    </footer>
  );
}