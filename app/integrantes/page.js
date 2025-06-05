// app/integrantes/page.js
import Image from 'next/image'; // Não é mais usado diretamente aqui, mas pode manter
import MemberCard from '../../components/MemberCard'; // Caminho correto para o componente
import styles from './IntegrantesPage.module.css'; // CSS Module da página

// Dados dos integrantes (substitua com seus dados e caminhos de imagem corretos)
const members = [
  {
    id: 1,
    name: "Ander",
    titleOrQuote: "Matoso", // Ajuste para algo mais descritivo ou um quote
    imageUrl: "/images/integrantes/ander.jpg", // Caminho correto para a imagem
  },
  {
    id: 2,
    name: "Ever",
    titleOrQuote: "Ervis",
    imageUrl: "/images/integrantes/ever.jpg", // Caminho correto para a imagem
  },
  {
    id: 3,
    name: "Luis Miguel",
    titleOrQuote: "stive",
    imageUrl: "/images/integrantes/luis.jpg", // Caminho correto para a imagem
  },
  {
    id: 4,
    name: "Edson",
    titleOrQuote: "Edsan",
    imageUrl: "/images/integrantes/edson.jpg", // Caminho correto para a imagem
  },
  {
    id: 5,
    name: "Leandro",
    titleOrQuote: "krina",
    imageUrl: "/images/integrantes/Matoso.jpg",
  },
  {
    id: 6,
    name: "Cabelo",
    titleOrQuote: "Cabelo",
    imageUrl: "/images/integrantes/cabelo.jpg", // Caminho correto para a imagem
  },
   {
    id: 7,
    name: "Fábio",  
    titleOrQuote: "Bart",
    imageUrl: "/images/integrantes/bart.jpg", // Caminho correto para a imagem
  },
  {
    id: 8,
    name: "Willians",
    titleOrQuote: "WC",
    imageUrl: "/images/integrantes/willians.jpg", // Caminho correto para a imagem
  },
  {
    id: 9,
    name: "Adriano",
    titleOrQuote: "Banana",
    imageUrl: "/images/integrantes/adriano.jpg", // Caminho correto para a imagem
  },
  {
    id: 10,
    name: "André",
    titleOrQuote: "Sidnelson",
    imageUrl: "/images/integrantes/andre.jpg", // Caminho correto para a imagem
  },
  {
    id: 11,
    name: "Kenji",
    titleOrQuote: "Neuso",
    imageUrl: "/images/integrantes/Matoso.jpg",
  },
  {
    id: 12,
    name: "Marcio",
    titleOrQuote: "Chamel",
    imageUrl: "/images/integrantes/marcio.jpg", // Caminho correto para a imagem
  },
  {
    id: 13,
    name: "Luli",
    titleOrQuote: "Luli",
    imageUrl: "/images/integrantes/luli.jpg", // Caminho correto para a imagem
  },
  {
    id: 14,
    name: "Juninho",
    titleOrQuote: "Marrom",
    imageUrl: "/images/integrantes/juninho.jpg", // Caminho correto para a imagem
  },
  {
    id: 15,
    name: "João",
    titleOrQuote: "Jão",
    imageUrl: "/images/integrantes/joao.jpg", // Caminho correto para a imagem
  },
  {
    id: 16,
    name: "Rafael",
    titleOrQuote: "Rafael",
    imageUrl: "/images/integrantes/rafael.jpg", // Caminho correto para a imagem}
  },
  // Adicione mais integrantes conforme necessário:
  // {
  //   id: 5,
  //   name: "Ciclana Silva",
  //   titleOrQuote: "A Voz da Razão",
  //   imageUrl: "/images/integrantes/ciclana.jpg",
  // },
];

export const metadata = {
  title: 'Integrantes - Irmãos Coragem',
  description: 'Conheça os valentes membros do grupo Irmãos Coragem.',
};

export default function IntegrantesPage() {
  return (
    <main className={styles.pageContainer}>
      <section className={styles.integrantesSection}>
        <div className={styles.container}>
          
          {members && members.length > 0 ? (
            <div className={styles.integrantesGrid}>
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  name={member.name}
                  titleOrQuote={member.titleOrQuote}
                  imageUrl={member.imageUrl}
                />
              ))}
            </div>
          ) : (
            <p className={styles.noMembersText}>
              Nenhum integrante para mostrar no momento. Volte em breve!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}