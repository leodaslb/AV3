"use client";
import { useState, useEffect } from 'react';
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';

type ModalProps = {
  etapa: any;
  onClose: () => void;
  onAssociar: (etapaId: string, funcionarioId: string) => void;
}

export default function ModalAssociarFunc({ etapa, onClose, onAssociar }: ModalProps) {
  // Estado para armazenar os funcionários 
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  
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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Associar Funcionário</h3>
          <p>Etapa: {etapa.nome}</p>
          <button onClick={onClose} className={styles.modalCloseButton}>X</button>
        </div>
        <div className={styles.modalBody}>
          <h4>Selecione um funcionário:</h4>
          
          {isLoading ? (
            <p>Carregando lista...</p>
          ) : (
            <ul className={styles.funcionarioList}>
              {funcionarios.length === 0 ? (
                <p>Nenhum funcionário cadastrado.</p>
              ) : (
                funcionarios.map(func => (
                  <li key={func.id} className={styles.funcionarioItem}>
                    <div>
                      <strong>{func.nome}</strong>
                      <br />
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {func.nivelPermissao}
                      </span>
                    </div>
                    <Button 
                     
                      onClick={() => onAssociar(etapa.id, func.id)}
                    >
                      Associar
                    </Button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}