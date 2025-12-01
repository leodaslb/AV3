'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css'; 
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-start-time': Date.now().toString()
        },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        

        localStorage.setItem('aerocode_user', JSON.stringify(data.usuario));
        
        alert(`Bem-vindo(a), ${data.usuario.nome}!`);
        router.push('/aeronaves'); 
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error(err);
      setError('Erro de conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Aerocode</h1>
        <p className={styles.subtitle}>Sistema de Gestão de Produção</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="usuario">Usuário</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              disabled={isLoading}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              disabled={isLoading}
              className={styles.input}
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <Button type="submit" className={styles.loginButton} disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}