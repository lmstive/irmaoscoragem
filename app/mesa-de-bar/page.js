'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebaseConfig.js'; 
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'; // <<< Adicionamos addDoc e serverTimestamp

// --- Componente do Formulário de Novo Post ---
const NewPostForm = () => {
  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função chamada quando o formulário é enviado
  const handlePublicar = async (e) => {
    e.preventDefault(); // Impede que a página recarregue

    if (!texto.trim() || !autor.trim()) {
      alert('Por favor, preencha seu nome e a mensagem.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Adiciona um novo documento na coleção 'resenhas'
      await addDoc(collection(db, 'resenhas'), {
        autor: autor,
        titulo: titulo,
        texto: texto,
        createdAt: serverTimestamp(), // Pega a hora exata do servidor do Firebase
        comentarios: [] // Começa com uma lista de comentários vazia
      });

      // Limpa os campos do formulário após o sucesso
      setAutor('');
      setTitulo('');
      setTexto('');

    } catch (error) {
      console.error("Erro ao publicar resenha: ", error);
      alert("Ocorreu um erro ao publicar sua resenha. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="new-post-form" onSubmit={handlePublicar}>
      <h2 className="text-2xl font-ruach mb-6">Puxar um Assunto Novo</h2>
      <div className="form-group">
        <input 
          type="text" 
          className="form-input" 
          placeholder="Seu nome ou apelido"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input 
          type="text" 
          className="form-input" 
          placeholder="Título da Resenha (opcional)"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea 
          className="form-textarea" 
          placeholder="Qual a boa de hoje? Conte uma história, puxe um assunto..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="form-button" disabled={isSubmitting}>
        {isSubmitting ? 'Publicando...' : 'Publicar na Mesa'}
      </button>
    </form>
  );
};


// --- Componente do Card de Resenha (sem grandes alterações) ---
const ResenhaCard = ({ resenha }) => {
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
       {/* A parte de comentários continua desativada por enquanto */}
    </div>
  );
};


// --- Componente Principal da Página ---
export default function MesaDeBarPage() {
  const [resenhas, setResenhas] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect para buscar os dados do Firebase (sem alterações)
  useEffect(() => {
    const q = query(collection(db, 'resenhas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resenhasData = [];
      querySnapshot.forEach((doc) => {
        resenhasData.push({ ...doc.data(), id: doc.id });
      });
      setResenhas(resenhasData);
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