"use client";
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';

const OPCOES_STATUS_TESTE = ["APROVADO","REPROVADO" ,"PENDENTE"];

type AbaTestesProps = {
  testes: any[]; // Defina um tipoTeste
  onAdicionarClick: () => void;
  onResultadoChange: (testeId: string, novoResultado: string) => void;
}

export default function AbaTestes({ testes, onAdicionarClick, onResultadoChange}: AbaTestesProps) {
  return (
    <div className={styles.conteudoAba}>
       <div className={styles.abaHeader}>
        <h2>Lista testes</h2>
        <Button onClick={onAdicionarClick}>+ Adicionar</Button>
      </div>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {testes.map(teste => (
            <tr key={teste.id}>
              <td>{teste.tipo}</td>
              <td><select 
                  value={teste.resultado}
                  onChange={(e) => onResultadoChange(teste.id, e.target.value)}
                  className={styles.dropdownStatus}
                >
                  {OPCOES_STATUS_TESTE.map(resultado => (
                    <option key={resultado} value={resultado}>
                      {resultado}
                    </option>
                  ))}
                </select></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}