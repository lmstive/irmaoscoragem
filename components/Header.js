'use client';

import Link from 'next/link';
import Image from 'next/image';
import { UserAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { user, logOut } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* Sua estrutura de logo, mantida 100% intacta */}
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
          {/* Sua lista de links, mantida 100% intacta */}
          <ul>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/historia">História</Link></li>
            <li><Link href="/integrantes">Integrantes</Link></li>
            <li><Link href="/galeria">Galeria</Link></li>
            <li><Link href="/mesa-de-bar">Mesa de Bar</Link></li>
            <li><Link href="/por-onde-andam">Por Onde Andam</Link></li>
          </ul>

          {/* Seção de Autenticação Atualizada */}
          <div className="auth-actions">
            {user ? (
              // Se o usuário ESTIVER logado
              <>
                <span className="user-greeting">Olá, {user.displayName || user.email}</span>
                {/* <<< LINK PARA O PERFIL ADICIONADO AQUI >>> */}
                <Link href="/perfil" className="profile-link">Meu Perfil</Link>
                <button onClick={handleLogOut} className="logout-button">Sair</button>
              </>
            ) : (
              // Se o usuário NÃO ESTIVER logado
              <>
                <Link href="/login" className="login-button">Login</Link>
                {/* <<< LINK PARA CADASTRO ADICIONADO AQUI >>> */}
                <Link href="/cadastro" className="login-button">Cadastre-se</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}