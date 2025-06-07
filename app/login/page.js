'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext'; // Nosso hook de autenticação

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = UserAuth(); // Pegando a função de login do nosso contexto
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores
    try {
      await signIn(email, password);
      // Se o login der certo, redireciona o usuário para a Mesa de Bar
      router.push('/mesa-de-bar');
    } catch (e) {
      setError("Email ou senha inválidos. Tente novamente.");
      console.error(e.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">Acesso à Resenha</h1>
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <input 
              type="email"
              className="form-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">Entrar</button>

          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}