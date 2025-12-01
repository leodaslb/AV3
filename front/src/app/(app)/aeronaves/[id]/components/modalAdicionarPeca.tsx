"use client";
import { useState } from 'react';
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';

// Define as opções de status
const OPCOES_STATUS_PECA = ["PRONTA", "EM_PRODUCAO", "EM_TRANSPORTE"];
const OPCOES_TIPO_PECA = ["NACIONAL", "IMPORTADA"];

type ModalPecaProps = {
  onClose: () => void;
  onAdicionar: (novaPeca: any) => void;
}

export default function ModalAdicionarPeca({ onClose, onAdicionar }: ModalPecaProps) {
 
  const [nome, setNome] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [tipo, setTipo] = useState(OPCOES_TIPO_PECA[0]);
  const [status, setStatus] = useState(OPCOES_STATUS_PECA[0]);

  const handleSubmit = () => {
    // Validação simples
    if (!nome || !fornecedor) {
      alert('Nome e Fornecedor são obrigatórios.');
      return;
    }
    
    // Cria o novo objeto Peça
    const novaPeca = {
      id: `p-${Math.random().toString(36).substring(7)}`,
      nome,
      fornecedor,
      tipo,
      status,
    };
    
    onAdicionar(novaPeca); // Envia o novo objeto para o pai
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Adicionar Nova Peça</h3>
          <button onClick={onClose} className={styles.modalCloseButton}>X</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome da Peça:</label>
            <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fornecedor">Fornecedor:</label>
            <input id="fornecedor" type="text" value={fornecedor} onChange={(e) => setFornecedor(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tipo">Tipo:</label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {OPCOES_TIPO_PECA.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status Inicial:</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              {OPCOES_STATUS_PECA.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <Button onClick={handleSubmit} >
            Adicionar Peça
          </Button>
        </div>
      </div>
    </div>
  );
}