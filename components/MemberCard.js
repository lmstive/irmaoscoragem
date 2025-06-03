// components/MemberCard.js
import Image from 'next/image';
import styles from './MemberCard.module.css';

export default function MemberCard({ name, titleOrQuote, imageUrl }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={`Foto de ${name}`}
          fill // <--- MUITO IMPORTANTE: Faz a imagem preencher o pai
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw" // Ajuda o Next.js a carregar o tamanho certo de imagem. Ajuste conforme sua grid.
                                                                        // Basicamente: (tela pequena) imagem ocupa quase toda tela, (tela média) 2 por linha, (tela grande) 3+ por linha.
          className={styles.memberImage} // A classe ainda pode ser usada para outros estilos, como transições.
          style={{ objectFit: 'cover' }} // <--- MUITO IMPORTANTE: Garante que a imagem cubra sem distorcer. Com 'fill', objectFit vai para 'style'.
          priority={name === "Matoso"} // Exemplo
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.memberName}>{name}</h3>
        <p className={styles.memberTitleOrQuote}>{titleOrQuote}</p>
      </div>
    </div>
  );
}