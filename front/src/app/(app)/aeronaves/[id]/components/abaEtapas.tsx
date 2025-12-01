"use client";
import styles from '../detalhes.module.css';
import { Button } from '@/components/ui/button';

type AbaEtapasProps = {
  etapas: any[]; 
  onAssociarClick: (etapa: any) => void;
  onAdicionarClick: () => void;
  onIniciarEtapa: (etapaId: string) => void;
  onConcluirEtapa: (etapaId: string) => void;
}

export default function AbaEtapas({ 
  etapas, 
  onAssociarClick, 
  onAdicionarClick,
  onIniciarEtapa,
  onConcluirEtapa
}: AbaEtapasProps) {
  
  return (
    <div className={styles.conteudoAba}>
      <div className={styles.abaHeader}>
        <h2>Lista etapas</h2>
        <Button onClick={onAdicionarClick}>+ Adicionar</Button>
      </div>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Prazo</th>
            <th>Equipe</th> 
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {etapas.map(etapa => (
            <tr key={etapa.id}>
              <td>{etapa.nome}</td>
              <td>{etapa.prazo}</td>
              
              
              <td>
                {etapa.funcionarios && etapa.funcionarios.length > 0 ? (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {etapa.funcionarios.map((func: any) => (
                      <span 
                        key={func.id} 
                        style={{ 
                          fontSize: '0.75rem', 
                          backgroundColor: '#f0f0f0', 
                          padding: '2px 6px', 
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                      >
                       
                        {func.nome ? func.nome.split(' ')[0] : 'Func'}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span style={{ color: '#999', fontSize: '0.8rem' }}>Sem equipe</span>
                )}
              </td>
             

              <td>{etapa.status}</td>
              <td className={styles.acoes}> 
                { etapa.status === 'PENDENTE' && (
                  <Button onClick={() => onIniciarEtapa(etapa.id)}>Iniciar</Button>
                )}
                { etapa.status === 'ANDAMENTO' && (
                  <Button onClick={() => onConcluirEtapa(etapa.id)}>Concluir</Button>
                )}
                { etapa.status === 'CONCLUIDA' && (
                  <span className={styles.statusConcluido}>✓ Concluída</span>
                )}
                
                <Button onClick={() => onAssociarClick(etapa)}>
                  + Func
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}