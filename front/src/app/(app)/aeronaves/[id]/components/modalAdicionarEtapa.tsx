"use client";
import { useState } from 'react';
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';

type ModalEtapaProps = {
  onClose: () => void;
  onAdicionar: (novaEtapa: any) => void;
}

export default function ModalAdicionarEtapa({ onClose, onAdicionar }: ModalEtapaProps) {
  const [nome, setNome] = useState('');
  const [prazo, setPrazo] = useState('');

  const handleSubmit = () => {
    if (!nome || !prazo) {
      alert('Nome e Prazo são obrigatórios.');
      return;
    }
    
    const novaEtapa = {
      id: `e-${Math.random().toString(36).substring(7)}`,
      nome,
      prazo,
      status: 'Pendente',
    };
    
    onAdicionar(novaEtapa);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Adicionar Nova Etapa</h3>
          <button onClick={onClose} className={styles.modalCloseButton}>X</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome da Etapa:</label>
            <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="prazo">Prazo (ex: 30 dias):</label>
            <input id="prazo" type="text" value={prazo} onChange={(e) => setPrazo(e.target.value)} />
          </div>
          <Button onClick={handleSubmit} >
            Adicionar Etapa
          </Button>
        </div>
      </div>
    </div>
  );
}