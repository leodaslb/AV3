

import styles from '@/components/modals/modal.module.css'


import { useState } from 'react';

import { Button } from '@/components/ui/button';

const OPCOES_FUNCAO = ["Administrador", "Engenheiro", "Operador"];

type ModalFuncProps = {
  onClose: () => void;
  onAdicionar: (novoFunc: any) => void;
}

export default function ModalCadastrarFuncionario({ onClose, onAdicionar }: ModalFuncProps) {
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState(OPCOES_FUNCAO[2]);
  const [telefone, setTelefone] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = () => {
    if (!nome || !usuario || !senha) {
      alert('Nome, Usuário e Senha são obrigatórios.');
      return;
    }
    
    const novoFunc = {
      id: `f-${Math.floor(Math.random() * 10000)}`, 
      nome,
      telefone,
      usuario,
      senha,
      
      nivelPermissao: funcao.toUpperCase(), 
    };
    
    onAdicionar(novoFunc);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Cadastrar Novo Funcionário</h3>
          <button onClick={onClose} className={styles.modalCloseButton}>X</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome Completo:</label>
            <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="funcao">Função (Nível):</label>
            <select id="funcao" value={funcao} onChange={(e) => setFuncao(e.target.value)}>
              {OPCOES_FUNCAO.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="telefone">Telefone:</label>
            <input id="telefone" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="usuario">Usuário (Login):</label>
            <input id="usuario" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha:</label>
            <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
          <Button onClick={handleSubmit} >
            Cadastrar Funcionário
          </Button>
        </div>
      </div>
    </div>
  );
}