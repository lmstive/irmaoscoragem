// components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLinkWrapper}>
          <Image
            src="/mascote-dragao.png"
            alt="Mascote Irmãos Coragem Dragão"
            width={55}
            height={55}
            className={styles.logoMascote}
            priority
          />
          <Image
            src="/nome.png"
            alt="Irmãos Coragem Nome"
            width={170}
            height={50}
            className={styles.logoNome}
          />
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Início</Link>
          <Link href="/historia" className={styles.navLink}>História</Link>
          {/* Link Adicionado ABAIXO */}
          <Link href="/integrantes" className={styles.navLink}>Integrantes</Link>
          <Link href="/galeria" className={styles.navLink}>Galeria</Link>
          <Link href="/onde-andam" className={styles.navLink}>Por Onde Andam</Link>
          <Link href="/mesa-de-bar" className={styles.navLink}>Mesa de Bar</Link>
        </nav>
      </div>
    </header>
  );
}