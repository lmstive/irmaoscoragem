'use client';

import { useState, useEffect } from 'react';
import { galerias } from '@/data/galerias';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function GaleriaPage({ params }) {
  const galeria = galerias.find((g) => g.slug === params.slug);
  const [indiceAtual, setIndiceAtual] = useState(null);

  if (!galeria) {
    notFound();
  }

  const abrirFoto = (index) => setIndiceAtual(index);
  const fecharFoto = () => setIndiceAtual(null);

  const irParaProxima = (e) => {
    e.stopPropagation();
    const proximoIndice = (indiceAtual + 1) % galeria.fotos.length;
    setIndiceAtual(proximoIndice);
  };

  const irParaAnterior = (e) => {
    e.stopPropagation();
    const indiceAnterior = (indiceAtual - 1 + galeria.fotos.length) % galeria.fotos.length;
    setIndiceAtual(indiceAnterior);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (indiceAtual === null) return; // Não faz nada se o visualizador estiver fechado
      if (e.key === 'Escape') fecharFoto();
      if (e.key === 'ArrowRight') irParaProxima(e);
      if (e.key === 'ArrowLeft') irParaAnterior(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [indiceAtual]); // Dependência adicionada para registrar/remover o evento corretamente

  return (
    <div className="gallery-page-container">
      <header className="gallery-header">
        <h1>{galeria.titulo}</h1>
        <p>{galeria.descricao}</p>
      </header>

      <div className="gallery-grid">
        {galeria.fotos.map((foto, index) => (
          <div key={index} className="gallery-photo-item" onClick={() => abrirFoto(index)}>
            <Image
              src={foto}
              alt={`${galeria.titulo} - Foto ${index + 1}`}
              width={300}
              height={300}
              // A tag img já é estilizada pela classe do container
            />
          </div>
        ))}
      </div>

      {/* --- VISUALIZADOR (LIGHTBOX) --- */}
      {indiceAtual !== null && (
        <div className="lightbox-overlay" onClick={fecharFoto}>
          <button className="lightbox-close" onClick={fecharFoto}>&times;</button>
          
          <button className="lightbox-nav lightbox-prev" onClick={irParaAnterior}>&#10094;</button>

          {/* Clicar na imagem não fecha o modal */}
          <div onClick={(e) => e.stopPropagation()} style={{display: 'contents'}}>
            <Image
              key={indiceAtual} // Força a recarga para a animação
              src={galeria.fotos[indiceAtual]}
              alt="Visualização ampliada"
              width={1600}
              height={900}
              className="lightbox-image"
            />
          </div>
          
          <button className="lightbox-nav lightbox-next" onClick={irParaProxima}>&#10095;</button>
        </div>
      )}
    </div>
  );
}