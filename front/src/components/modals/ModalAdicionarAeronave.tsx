"use client";
import { useState } from 'react';
import styles from './modal.module.css'
import { Button } from '@/components/ui/button';

// Define as opções de tipo
const OPCOES_TIPO_AERONAVE = ["COMERCIAL", "MILITAR"];

type ModalAeronaveProps = {
  onClose: () => void;
  onAdicionar: (novaAeronave: any) => void;
}

export default function ModalAdicionarAeronave({ onClose, onAdicionar }: ModalAeronaveProps) {
  // State interno para o formulário
  const [codigo, setCodigo] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState(OPCOES_TIPO_AERONAVE[0]);
  const [capacidade, setCapacidade] = useState('');

  const handleSubmit = () => {

    if (!codigo || !modelo || !capacidade) {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    
    const novaAeronave = {
      id: codigo, 
      modelo,
      tipo,
      capacidade: parseInt(capacidade),
    };
    
    onAdicionar(novaAeronave);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Cadastrar Nova Aeronave</h3>
          <button onClick={onClose} className={styles.modalCloseButton}>X</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label htmlFor="codigo">Código Único:</label>
            <input id="codigo" type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="modelo">Modelo:</label>
            <input id="modelo" type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
          </div>
           <div className={styles.formGroup}>
            <label htmlFor="capacidade">Capacidade (Passageiros):</label>
            <input id="capacidade" type="number" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tipo">Tipo:</label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {OPCOES_TIPO_AERONAVE.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <Button onClick={handleSubmit} >
            Cadastrar Aeronave
          </Button>
        </div>
      </div>
    </div>
  );
}