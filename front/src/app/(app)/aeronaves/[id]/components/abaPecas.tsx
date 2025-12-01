"use client";
import styles from '../detalhes.module.css'; 
import { Button } from '@/components/ui/button';

// Define as opções de status
const OPCOES_STATUS_PECA = [
  "PRONTA",
  "EM_PRODUCAO",
  "EM_TRANSPORTE",
];

// Define os tipos das props que este componente recebe
type AbaPecasProps = {
  pecas: any[];
  onStatusChange: (pecaId: string, novoStatus: string) => void;
  onAdicionarClick: () => void;
}

export default function AbaPecas({ pecas, onStatusChange, onAdicionarClick }: AbaPecasProps) {
  return (
    <div className={styles.conteudoAba}>
      <div className={styles.abaHeader}>
        <h2>Lista peças</h2>
        <Button onClick={onAdicionarClick}>+ Adicionar</Button>
      </div>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Fornecedor</th>
            <th>Tipo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pecas.map(peca => (
            <tr key={peca.id}>
              <td>{peca.nome}</td>
              <td>{peca.fornecedor}</td>
              <td>{peca.tipo}</td>
              <td>
                <select 
                  value={peca.status}
                  onChange={(e) => onStatusChange(peca.id, e.target.value)}
                  className={styles.dropdownStatus}
                >
                  {OPCOES_STATUS_PECA.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}