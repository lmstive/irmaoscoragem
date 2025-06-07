'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, updateUserProfile } = UserAuth();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Preenche o campo com o nome atual do usuário quando a página carrega
  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await updateUserProfile(name);
      setMessage('Perfil atualizado com sucesso!');
    } catch (error) {
      setMessage('Erro ao atualizar o perfil.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Se o usuário não estiver logado, mostra um convite para login
  if (!user) {
    return (
      <div className="profile-page-container text-center">
        <p className="mb-4">Você precisa estar logado para ver seu perfil.</p>
        <Link href="/login" className="form-button">Fazer Login</Link>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <h1 className="profile-title">Meu Perfil</h1>
        
        <div className="profile-info">
          <span className="profile-info-label">Email:</span>
          <span className="profile-info-value">{user.email}</span>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label htmlFor="displayName" className="block mb-2 text-gray-400">
              Nome de Exibição / Apelido:
            </label>
            <input
              id="displayName"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como você quer ser chamado?"
            />
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
}