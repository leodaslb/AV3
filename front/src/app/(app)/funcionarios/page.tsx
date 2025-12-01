'use client';
import { Button } from '@/components/ui/button';
import styles from './funcionarios.module.css';
import { useState, useEffect } from 'react';
import ModalCadastrarFuncionario from '@/components/modals/ModalCadastrarFuncionario';

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. BUSCAR FUNCIONÁRIOS
  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await fetch('http://localhost:3001/funcionarios');
        if (response.ok) {
          const data = await response.json();
          setFuncionarios(data);
        } else {
          console.error('Erro ao buscar funcionários');
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFuncionarios();
  }, []);

  // 2. CADASTRAR FUNCIONÁRIO
  const handleAdicionarFuncionario = async (novoFunc: any) => {
    try {
      const response = await fetch('http://localhost:3001/funcionarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoFunc),
      });

      if (response.ok) {
        const funcionarioCriado = await response.json();
        // Adiciona à lista visualmente
        setFuncionarios(atual => [...atual, funcionarioCriado]);
        alert('Funcionário cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar. Verifique se o usuário já existe.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Lista Funcionários</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            + Adicionar Funcionário
          </Button>
        </div>

        {isLoading ? (
          <p>Carregando equipe...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função / Permissão</th>
                <th>Telefone</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{textAlign: 'center'}}>Nenhum funcionário encontrado.</td>
                </tr>
              ) : (
                funcionarios.map((func) => (
                  <tr key={func.id}>
                    <td>{func.nome}</td>
                   
                    <td>{func.nivelPermissao}</td> 
                    <td>{func.telefone}</td>
                    <td>{func.usuario}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <ModalCadastrarFuncionario
          onClose={() => setIsModalOpen(false)}
          onAdicionar={handleAdicionarFuncionario}
        />
      )}
    </>
  );
}