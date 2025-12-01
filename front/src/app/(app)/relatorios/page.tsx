'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import styles from './relatorios.module.css';

export default function RelatoriosPage() {
  const [aeronaves, setAeronaves] = useState<any[]>([]);
  const [selectedAeronaveId, setSelectedAeronaveId] = useState<string>('');
  const [nomeCliente, setNomeCliente] = useState<string>('');
  const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. BUSCAR DADOS REAIS DO SERVIDOR
  useEffect(() => {
    async function fetchAeronaves() {
      try {
        const response = await fetch('http://localhost:3001/aeronaves');
        if (response.ok) {
          const data = await response.json();
          setAeronaves(data);
        }
      } catch (error) {
        console.error('Erro ao buscar aeronaves:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAeronaves();
  }, []);

  const handleGerarRelatorio = () => {
    setMessage(null);

    if (!selectedAeronaveId || !nomeCliente) {
      setMessage({ type: 'error', text: 'Por favor, preencha todos os campos.' });
      return;
    }

    
    const aeronaveSelecionada = aeronaves.find(a => a.id === selectedAeronaveId);
    
    fetch(`http://localhost:3001/aeronaves/${selectedAeronaveId}`)
      .then(res => res.json())
      .then(aeronaveCompleta => {
        const etapas = aeronaveCompleta.etapas || [];
        const algumaPendente = etapas.some((e: any) => e.status !== 'CONCLUIDA');

        if (etapas.length === 0 || algumaPendente) {
           setMessage({ type: 'error', text: 'Erro: Aeronave possui etapas pendentes.' });
        } else {
         
           const conteudoRelatorio = `
RELATÓRIO DE ENTREGA - AEROCODE
-------------------------------
Cliente: ${nomeCliente}
Data: ${new Date().toLocaleDateString()}

Aeronave: ${aeronaveCompleta.modelo}
Código: ${aeronaveCompleta.id}
Tipo: ${aeronaveCompleta.tipo}

Resumo:
- Peças Instaladas: ${aeronaveCompleta.pecas.length}
- Etapas Concluídas: ${aeronaveCompleta.etapas.length}
- Testes Realizados: ${aeronaveCompleta.testes.length}

Status Final: APROVADA PARA ENTREGA
-------------------------------
           `;

           const blob = new Blob([conteudoRelatorio], { type: 'text/plain' });
           const url = window.URL.createObjectURL(blob);
           const a = document.createElement('a');
           a.href = url;
           a.download = `Relatorio_${aeronaveCompleta.id}.txt`;
           a.click();

           setMessage({ type: 'success', text: 'Relatório gerado e download iniciado!' });
           setSelectedAeronaveId('');
           setNomeCliente('');
        }
      })
      .catch(err => {
        setMessage({ type: 'error', text: 'Erro ao validar aeronave.' });
      });
  };

  return (
    <div className={styles.container}>
      <h1>Gerar Relatório</h1>
      
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="aeronave">Selecionar Aeronave:</label>
          <select 
            id="aeronave" 
            value={selectedAeronaveId} 
            onChange={(e) => setSelectedAeronaveId(e.target.value)}
            className={styles.selectInput}
            disabled={isLoading}
          >
            <option value="" disabled>-- Escolha uma aeronave --</option>
            {aeronaves.map(a => (
              <option key={a.id} value={a.id}>
                {a.modelo} ({a.id})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cliente">Nome do Cliente:</label>
          <input 
            id="cliente" 
            type="text" 
            value={nomeCliente} 
            onChange={(e) => setNomeCliente(e.target.value)}
            className={styles.textInput}
          />
        </div>

        <Button onClick={handleGerarRelatorio} >
          Gerar Relatório
        </Button>

        {message && (
          <div className={message.type === 'error' ? styles.messageError : styles.messageSuccess}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}