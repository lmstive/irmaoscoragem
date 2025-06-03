// app/page.js

export default function HomePage() {
  return (
    <main style={{ paddingTop: '20px', paddingBottom: '20px' }}> {/* Adiciona um pouco de espaçamento */}
      {/* Esta é a sua nova seção "Início". 
        Vamos precisar das suas ideias para o design e conteúdo aqui!
        Ex: Uma imagem de fundo impactante? Um texto de boas-vindas mais elaborado? Botões?
      */}
      <section 
        id="inicio" 
        style={{ 
          padding: '60px 20px', 
          textAlign: 'center', 
          minHeight: '70vh', // Para ocupar uma boa parte da tela
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '2px solid #333' // Linha separadora sutil
        }}
      >
        <h1 style={{ fontSize: '2.8rem', color: '#B5B7B9', marginBottom: '20px' }}>
          Bem-vindos ao Irmãos Coragem!
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#bbbbbb', maxWidth: '700px', lineHeight: '1.8' }}>
          Aqui a resenha e a amizade são eternas, e as histórias... 
          bem, algumas melhor nem contar! 🍻 Décadas se passaram, mas a zoeira e o 
          companheirismo continuam firmes.
        </p>
        {/* Poderíamos adicionar um botão aqui depois, ex: <button>Nossa História</button> */}
      </section>

      {/* Outras seções que você queira na página inicial podem vir aqui.
          Por exemplo, um pequeno teaser da seção "Nossa História" ou "Integrantes".
          Mas, por agora, vamos manter assim para ver a mudança. 
      */}
    </main>
  );
}