'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = UserAuth(); // Usando a nova função de cadastro
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      // Se o cadastro der certo, redireciona para a página de PERFIL
      // para o usuário já definir seu apelido.
      router.push('/perfil');
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">Criar Conta</h1>
        <form onSubmit={handleSignUp}>
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
              placeholder="Senha (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">Criar Conta</button>

          {error && <p className="login-error">Ocorreu um erro. Verifique o email e a senha.</p>}
        </form>
        <p className="text-center text-gray-400 mt-6">
          Já tem uma conta? <Link href="/login" className="text-white hover:underline">Faça o login</Link>
        </p>
      </div>
    </div>
  );
}