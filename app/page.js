'use client'; 

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { proximosEventos } from '@/data/eventos.js';
import { integrantes } from '@/data/integrantes.js';

// --- COMPONENTES DAS SEÇÕES ---

const HeroSection = () => (
  <section className="home-hero-container hero-overlay" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
    <div className="hero-content">
      <h1 className="hero-title">Irmãos Coragem</h1>
      <p className="hero-subtitle">
        Décadas de história, amizade e resenhas que não acabam mais.
        Seja bem-vindo ao Irmaãos Coragem.
      </p>
    </div>
  </section>
);

const CardsSection = () => {
    const proximoEvento = getNextEvent();
    return (
      <section className="cards-section-container">
        <div className="cards-grid">
          <Link href="/#evento" className="info-card glass-effect card-evento">
            <div className="info-card__icon">📅</div>
            <h3 className="info-card__title">Nosso Próximo Encontro</h3>
            {proximoEvento ? (
              <div>
                <p className="info-card__highlight">{proximoEvento.titulo}</p>
                <p className="info-card__text">{formatEventDate(proximoEvento.date)} em {proximoEvento.local}</p>
              </div>
            ) : (
              <div>
                 <p className="info-card__highlight">Casamento do Willian</p>
                 <p className="info-card__text">Sábado, 07 de Junho de 2025</p>
              </div>
            )}
          </Link>
          <Link href="/integrantes" className="info-card glass-effect card-turma">
            <div className="info-card__icon">🍻</div>
            <h3 className="info-card__title">A Turma</h3>
            <p className="info-card__text">A base de tudo. Cada figura com sua história, juntos formamos o elenco principal.</p>
          </Link>
          <Link href="/galeria" className="info-card glass-effect card-memorias">
            <div className="info-card__icon">📸</div>
            <h3 className="info-card__title">Nossas Memórias</h3>
            <p className="info-card__text">Dos churrascos épicos às viagens inesquecíveis, cada foto é uma relíquia.</p>
          </Link>
        </div>
      </section>
    );
};
  
const WeddingCountdownSection = () => (
    <section className="countdown-section">
      <div className="countdown-card glass-effect">
        <h2 className="countdown-card__title">Contagem Regressiva</h2>
        <p className="countdown-card__subtitle">Para o grande dia do casamento do nosso irmão Willian!</p>
        <Countdown targetDate="2025-06-07T17:00:00" />
      </div>
    </section>
);

const BirthdaySection = () => {
  const [aniversariantesDoMes, setAniversariantesDoMes] = useState([]);
  const [nomeDoMes, setNomeDoMes] = useState('');

  useEffect(() => {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const nomeMes = hoje.toLocaleString('pt-BR', { month: 'long' });
    const filtrados = integrantes.filter(i => new Date(i.aniversario).getUTCMonth() === mesAtual);
    setAniversariantesDoMes(filtrados);
    setNomeDoMes(nomeMes);
  }, []);

  return (
    <section className="birthday-section-wrapper">
      <div className="birthday-section-card glass-effect">
        <h2 className="birthday-section-card__title">Parabéns aos Aniversariantes</h2>
        <p className="birthday-section-card__subtitle">de {nomeDoMes}!</p>
        {aniversariantesDoMes.length > 0 ? (
          <div className="birthday-grid">
            {aniversariantesDoMes.map((integrante) => (
              <div key={integrante.nome} className="birthday-card">
                <Image
                  src={integrante.fotoUrl}
                  alt={`Foto de ${integrante.nome}`}
                  width={120}
                  height={120}
                  className="birthday-card__image"
                />
                <h4 className="birthday-card__name">{integrante.nome}</h4>
                <p className="birthday-card__date">
                  Dia {new Date(integrante.aniversario).getUTCDate()} 🎂
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 italic">Nenhum aniversariante este mês. A resenha continua no próximo!</p>
        )}
      </div>
    </section>
  );
};

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          Dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          Minutos: Math.floor((difference / 1000 / 60) % 60),
          Segundos: Math.floor((difference / 1000) % 60),
        };
      }
      return {};
    };
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const timerComponents = Object.keys(timeLeft);
  return (
    <div className="countdown-container">
      {timerComponents.length ? (
        timerComponents.map((interval) => (
          <div key={interval} className="countdown-block">
            <div className="countdown-number">{timeLeft[interval]}</div>
            <div className="countdown-label">{interval}</div>
          </div>
        ))
      ) : (
        <span className="text-2xl font-bold text-white">O grande dia chegou!</span>
      )}
    </div>
  );
};


// --- PÁGINA PRINCIPAL ---
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CardsSection />
      <WeddingCountdownSection />
      <BirthdaySection />
    </main>
  );
}

// --- Funções Auxiliares ---
function getNextEvent() {
  const today = new Date();
  const futureEvents = proximosEventos.filter(evento => new Date(evento.date) > today);
  if (futureEvents.length === 0) return null;
  futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  return futureEvents[0];
}

function formatEventDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('pt-BR', options);
}