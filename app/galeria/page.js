import { galerias } from '@/data/galerias';
import Link from 'next/link';
import Image from 'next/image';

export default function PaginaGalerias() {
  return (
    <div className="gallery-page-container">
      <header className="gallery-header">
        <h1>Galeria de Fotos</h1>
        <p>Fotos dos Irmaos Coragem!</p>
      </header>

      <div className="album-grid">
        {galerias.map((galeria) => (
          <Link href={`/galeria/${galeria.slug}`} key={galeria.slug} className="album-card">
              <Image
                src={galeria.imagemCapa}
                alt={galeria.titulo}
                width={400}
                height={400}
                className="album-card-image"
              />
              <div className="album-card-overlay"></div>
              <div className="album-card-content">
                <h2>{galeria.titulo}</h2>
                <p>
                  {new Date(galeria.data).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}