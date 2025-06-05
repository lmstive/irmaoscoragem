import Link from 'next/link';
import { proximosEventos } from '@/data/eventos.js';

// Funções para buscar e formatar o próximo evento
function getNextEvent() {
  const today = new Date();
  const futureEvents = proximosEventos.filter(evento => new Date(evento.date) > today);
  if (futureEvents.length === 0) return null;
  futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  return futureEvents[0];
}

function formatEventDate(dateString) {
  // Uma formatação mais simples para o card
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('pt-BR', options);
}

export default function HomePage() {
  const proximoEvento = getNextEvent();

  // A seção HERO foi removida para focar apenas nos cards, conforme o problema.
  // Podemos adicioná-la de volta depois, se você quiser.

  return (
    // Removido o <main> daqui e colocado um container para a seção de cards
    <section className="cards-section-container">
      <div className="cards-grid">

        {/* CARD 1: PRÓXIMO ENCONTRO */}
        <Link href="/#evento" className="info-card glass-effect card-evento">
          <div className="info-card__icon">📅</div>
          <h3 className="info-card__title">Nosso Próximo Encontro</h3>
          {proximoEvento ? (
            <div>
              <p className="info-card__highlight">{proximoEvento.titulo}</p>
              <p className="info-card__text">{formatEventDate(proximoEvento.date)}</p>
              <p className="info-card__text">em {proximoEvento.local}</p>
            </div>
          ) : (
            <p className="info-card__text">Nenhum evento agendado no momento.</p>
          )}
        </Link>

        {/* CARD 2: A TURMA */}
        <Link href="/integrantes" className="info-card glass-effect card-turma">
          <div className="info-card__icon">🍻</div>
          <h3 className="info-card__title">A Turma</h3>
          <p className="info-card__text">
            A base de tudo. Cada figura com sua história, juntos formamos o elenco principal dessa resenha de longa data.
          </p>
        </Link>

        {/* CARD 3: NOSSAS MEMÓRIAS */}
        <Link href="/galeria" className="info-card glass-effect card-memorias">
          <div className="info-card__icon">📸</div>
          <h3 className="info-card__title">Nossas Memórias</h3>
          <p className="info-card__text">
            Dos churrascos épicos às viagens inesquecíveis, cada foto é uma relíquia guardada em nossa galeria.
          </p>
        </Link>
        
      </div>
    </section>
  );
}