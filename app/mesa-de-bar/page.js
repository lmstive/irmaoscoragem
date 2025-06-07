'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebaseConfig.js'; 
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { UserAuth } from '@/context/AuthContext'; // <<< Importamos o hook de autenticação

// --- COMPONENTE DO FORMULÁRIO DE NOVA RESENHA ---
const NewPostForm = ({ user }) => {
  // O campo 'autor' foi removido, pois usaremos o usuário logado
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublicar = async (e) => {
    e.preventDefault();
    if (!texto.trim()) {
      alert('Por favor, escreva sua mensagem.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'resenhas'), {
        autor: user.displayName || user.email, // <<< USA O NOME DO USUÁRIO LOGADO
        userId: user.uid, // Salva o ID do usuário para referência futura
        titulo: titulo,
        texto: texto,
        createdAt: serverTimestamp(),
      });
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
      {/* O campo de nome foi REMOVIDO */}
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
const NewCommentForm = ({ resenhaId, user }) => {
  const [texto, setTexto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    setIsSubmitting(true);
    try {
      const commentsCollectionRef = collection(db, 'resenhas', resenhaId, 'comentarios');
      await addDoc(commentsCollectionRef, {
        autor: user.displayName || user.email, // <<< USA O NOME DO USUÁRIO LOGADO
        userId: user.uid,
        texto: texto,
        createdAt: serverTimestamp(),
      });
      setTexto('');
    } catch (error) {
      console.error("Erro ao adicionar comentário: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-group mt-6" onSubmit={handleCommentSubmit}>
      <textarea className="form-textarea" placeholder="Escreva seu comentário..." rows="2" value={texto} onChange={(e) => setTexto(e.target.value)} required></textarea>
      <button type="submit" className="form-button mt-2" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Comentar'}
      </button>
    </form>
  );
};

// --- COMPONENTE DO CARD DE RESENHA ---
const ResenhaCard = ({ resenha, user }) => {
  const [comentariosVisiveis, setComentariosVisiveis] = useState(false);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    if (comentariosVisiveis) {
      const q = query(collection(db, 'resenhas', resenha.id, 'comentarios'), orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setComentarios(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
      return () => unsubscribe();
    }
  }, [comentariosVisiveis, resenha.id]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Agora mesmo';
    return new Date(timestamp.seconds * 1000).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
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
          {/* O formulário de comentário só aparece se o usuário estiver logado */}
          {user ? <NewCommentForm resenhaId={resenha.id} user={user} /> : <p className='mt-4 text-gray-400'>Faça o login para comentar.</p>}
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE "FAÇA O LOGIN" ---
const LoginPrompt = () => (
  <div className="new-post-form text-center">
    <h2 className="text-2xl font-ruach mb-4">Participe da Conversa</h2>
    <p className="text-gray-400 mb-6">Você precisa estar logado para iniciar uma nova resenha na Mesa de Bar.</p>
    <Link href="/login" className="form-button">
      Fazer Login
    </Link>
  </div>
);

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function MesaDeBarPage() {
  const [resenhas, setResenhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth(); // <<< Pegamos o usuário logado aqui!

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
      
      {/* Mostra o formulário de postagem OU o convite para login */}
      {user ? <NewPostForm user={user} /> : <LoginPrompt />}

      <div className="resenha-feed">
        {loading && <p className="text-center text-gray-400">Carregando a resenha da mesa...</p>}
        {!loading && resenhas.map(resenha => (
          <ResenhaCard key={resenha.id} resenha={resenha} user={user} />
        ))}
      </div>
    </main>
  );
}