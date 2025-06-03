// app/layout.js
import './globals.css';
import Header from '../components/Header'; // Presumindo que Header.js existe em components
import Footer from '../components/Footer'; // Presumindo que Footer.js existe em components

// Vamos tentar apenas com Poppins e uma configuração bem simples
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'], // Apenas um peso comum
  display: 'swap',
  // Não vamos usar 'variable' por enquanto para simplificar
});

// Comente completamente a importação e configuração da Ruach_LET para este teste
/*
import { Ruach_LET } from 'next/font/google';
const ruach = Ruach_LET({
  subsets: ['latin'], // Teste com o subset mais simples primeiro
  weight: ['400'],
  display: 'swap',
  variable: '--font-ruach',
});
*/

export const metadata = {
  title: 'Irmãos Coragem - Teste de Fontes',
  description: 'Configurando fontes no Next.js.',
};

export default function RootLayout({ children }) {
  return (
    // Aplicamos a classe da Poppins diretamente na tag <html>
    // Remova a variável da Ruach por enquanto: ${ruach.variable}
    <html lang="pt-BR" className={poppins.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}