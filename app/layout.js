import Header from '@/components/Header'; // Importando o seu menu
import Footer from '@/components/Footer'; // Importando o seu rodapé
import { AuthContextProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'Irmãos Coragem',
  description: 'O site oficial da resenha',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <AuthContextProvider>
          <Header />
          {/* É uma boa prática envolver o conteúdo principal em uma tag <main> */}
          <main>
            {children}
          </main>
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}