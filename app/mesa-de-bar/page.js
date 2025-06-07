'use client'; 

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebaseConfig.js'; 
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

// --- COMPONENTE DO FORMULÁRIO DE NOVA RESENHA (sem alterações) ---
const NewPostForm = () => {
  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublicar = async (e) => {
    e.preventDefault();
    if (!texto.trim() || !autor.trim()) {
      alert('Por favor, preencha seu nome e a mensagem.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'resenhas'), {
        autor: autor,
        titulo: titulo,
        texto: texto,
        createdAt: serverTimestamp(),
      });
      setAutor('');
      setTitulo('');
      setTexto('');
    } catch (error) {
      console.error("Erro ao publicar resenha: ", error);
      alert("Ocorreu um erro ao publicar sua resenha.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="new-post-form" onSubmit={handlePublicar}>
      <h2 className="text-2xl font-ruach mb-6">Puxar um Assunto Novo</h2>
      <div className="form-group">
        <input type="text" className="form-input" placeholder="Seu nome ou apelido" value={autor} onChange={(e) => setAutor(e.target.value)} required />
      </div>
      <div className="form-group">
        <input type="text" className="form-input" placeholder="Título da Resenha (opcional)" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div className="form-group">
        <textarea className="form-textarea" placeholder="Qual a boa de hoje? Conte uma história..." value={texto} onChange={(e) => setTexto(e.target.value)} required></textarea>
      </div>
      <button type="submit" className="form-button" disabled={isSubmitting}>{isSubmitting ? 'Publicando...' : 'Publicar na Mesa'}</button>
    </form>
  );
};

// --- COMPONENTE DO FORMULÁRIO DE NOVO COMENTÁRIO ---
const NewCommentForm = ({ resenhaId }) => {
  const [autor, setAutor] = useState('');
  const [texto, setTexto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!texto.trim() || !autor.trim()) {
      alert('Por favor, preencha seu nome e o comentário.');
      return;
    }
    setIsSubmitting(true);
    try {
      // Cria o caminho para a sub-coleção de comentários DENTRO da resenha específica
      const commentsCollectionRef = collection(db, 'resenhas', resenhaId, 'comentarios');
      await addDoc(commentsCollectionRef, {
        autor: autor,
        texto: texto,
        createdAt: serverTimestamp(),
      });
      setAutor('');
      setTexto('');
    } catch (error) {
      console.error("Erro ao adicionar comentário: ", error);
      alert("Ocorreu um erro ao comentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-group mt-6" onSubmit={handleCommentSubmit}>
      <input type="text" className="form-input mb-2" placeholder="Seu nome" value={autor} onChange={(e) => setAutor(e.target.value)} required/>
      <textarea className="form-textarea" placeholder="Escreva seu comentário..." rows="2" value={texto} onChange={(e) => setTexto(e.target.value)} required></textarea>
      <button type="submit" className="form-button mt-2" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Comentar'}
      </button>
    </form>
  );
};


// --- COMPONENTE DO CARD DE RESENHA (COM LÓGICA DE COMENTÁRIOS) ---
const ResenhaCard = ({ resenha }) => {
  const [comentariosVisiveis, setComentariosVisiveis] = useState(false);
  const [comentarios, setComentarios] = useState([]);

  // Busca os comentários em tempo real quando o usuário clica para vê-los
  useEffect(() => {
    if (comentariosVisiveis) {
      const commentsQuery = query(
        collection(db, 'resenhas', resenha.id, 'comentarios'),
        orderBy('createdAt', 'asc') // Comentários do mais antigo para o mais novo
      );

      const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setComentarios(commentsData);
      });

      return () => unsubscribe(); // Limpa o "ouvinte"
    }
  }, [comentariosVisiveis, resenha.id]); // Roda sempre que a visibilidade dos comentários mudar

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Agora mesmo';
    return new Date(timestamp.seconds * 1000).toLocaleString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="resenha-card">
      <div className="resenha-header">
        <div>
          <div className="resenha-author-name">{resenha.autor}</div>
          <div className="resenha-timestamp">{formatTimestamp(resenha.createdAt)}</div>
        </div>
      </div>
      <div className="resenha-content">
        {resenha.titulo && <h3 className="resenha-title">{resenha.titulo}</h3>}
        <p className="resenha-text">{resenha.texto}</p>
      </div>
      <div className="resenha-actions">
        <button onClick={() => setComentariosVisiveis(!comentariosVisiveis)} className="comment-button">
          💬 {comentariosVisiveis ? 'Fechar Comentários' : 'Comentar / Ver Comentários'}
        </button>
      </div>

      {comentariosVisiveis && (
        <div className="comments-section">
          {comentarios.map(comentario => (
            <div key={comentario.id} className="comment">
              <div className="comment-content">
                <div className="comment-author">{comentario.autor}</div>
                <p className="comment-text">{comentario.texto}</p>
              </div>
            </div>
          ))}
          <NewCommentForm resenhaId={resenha.id} />
        </div>
      )}
    </div>
  );
};


// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function MesaDeBarPage() {
  const [resenhas, setResenhas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'resenhas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setResenhas(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="mesa-de-bar-container">
      <h1 className="mesa-de-bar-title">Mesa de Bar</h1>
      <p className="mesa-de-bar-subtitle">Onde as resenhas ganham vida. Puxe um assunto ou entre na conversa.</p>
      <NewPostForm />
      <div className="resenha-feed">
        {loading && <p className="text-center text-gray-400">Carregando a resenha da mesa...</p>}
        {!loading && resenhas.map(resenha => (
          <ResenhaCard key={resenha.id} resenha={resenha} />
        ))}
      </div>
    </main>
  );
}