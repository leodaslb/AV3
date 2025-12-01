"use client";
import { useState } from 'react';
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';

const OPCOES_TIPO_TESTE = ["ELETRICO", "HIDRAULICO", "AERODINAMICO"];

type ModalTesteProps = {
  onClose: () => void;
  onAdicionar: (novoTeste: any) => void;
}

export default function ModalAdicionarTeste({ onClose, onAdicionar }: ModalTesteProps) {
  const [tipo, setTipo] = useState(OPCOES_TIPO_TESTE[0]);

  const handleSubmit = () => {
    const novoTeste = {
      id: `t-${Math.random().toString(36).substring(7)}`,
      tipo,
      resultado: 'Pendente', 
    };
    
    onAdicionar(novoTeste);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Adicionar Novo Teste</h3>
          <button onClick={onClose} className={styles.modalCloseButton}>X</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label htmlFor="tipo">Tipo de Teste:</label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {OPCOES_TIPO_TESTE.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <Button onClick={handleSubmit} >
            Adicionar Teste
          </Button>
        </div>
      </div>
    </div>
  );
}