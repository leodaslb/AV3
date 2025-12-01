
"use client"; 
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './detalhes.module.css';
import AbaPecas from './components/abaPecas';
import AbaEtapas from './components/abaEtapas';
import AbaTestes from './components/abaTestes';
import ModalAssociarFunc from './components/modalAssociarFunc';
import ModalAdicionarPeca from './components/modalAdicionarPeca';
import ModalAdicionarEtapa from './components/modalAdicionarEtapa';
import ModalAdicionarTeste from './components/modalAdicionarTeste';
import { Button } from '@/components/ui/button';

export default function DetalhesAeronave() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  // Estados de Dados 
  const [aeronave, setAeronave] = useState<any>(null);
  const [pecas, setPecas] = useState<any[]>([]);
  const [etapas, setEtapas] = useState<any[]>([]);
  const [testes, setTestes] = useState<any[]>([]);
  
  // Estados de Controle de Interface
  const [abaAtiva, setAbaAtiva] = useState('pecas');
  const [isLoading, setIsLoading] = useState(true);

  // Estados dos Modais
  const [isModalFuncOpen, setIsModalFuncOpen] = useState(false);
  const [etapaSelecionada, setEtapaSelecionada] = useState<any>(null);
  const [isModalPecaOpen, setIsModalPecaOpen] = useState(false);
  const [isModalEtapaOpen, setIsModalEtapaOpen] = useState(false);
  const [isModalTesteOpen, setIsModalTesteOpen] = useState(false);

  
  `http://localhost:3001/aeronaves/${id}`
  useEffect(() => {
    async function fetchDetalhes() {
      try {
        const response = await fetch(`http://localhost:3001/aeronaves/${id}`, {
         
          headers: {
            'x-start-time': Date.now().toString() 
          }
        });
        
        if (response.ok) {
          const data = await response.json();
         
          setAeronave(data);
          setPecas(data.pecas || []);
          setEtapas(data.etapas || []);
          setTestes(data.testes || []);
        } else {
          alert('Erro ao buscar detalhes da aeronave.');
          router.push('/aeronaves'); 
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchDetalhes();
    }
  }, [id, router]);

 const handleAdicionarPeca = async (novaPeca: any) => {
    try {
     
      const response = await fetch('http://localhost:3001/pecas', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-start-time': Date.now().toString() 
        },
        body: JSON.stringify({
          ...novaPeca,
          aeronaveId: id
        }),
      });

      if (response.ok) {
        const pecaCriada = await response.json();

        setPecas(current => [...current, pecaCriada]);
        alert('Peça adicionada com sucesso!');
      } else {
        alert('Erro ao adicionar peça.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    }
  };

  const handleStatusPecaChange = async (pecaId: string, novoStatus: string) => {
    try {
      
      setPecas(current => current.map(p => p.id === pecaId ? {...p, status: novoStatus} : p));

     
      await fetch(`http://localhost:3001/pecas/${pecaId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus }),
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar status.');
      
    }
  };

  // --- ETAPAS ---

  const handleAdicionarEtapa = async (novaEtapa: any) => {
    try {
      const response = await fetch('http://localhost:3001/etapas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...novaEtapa,
          aeronaveId: id
        }),
      });

      if (response.ok) {
        const etapaCriada = await response.json();
        setEtapas(current => [...current, etapaCriada]);
        alert('Etapa adicionada com sucesso!');
      } else {
        alert('Erro ao adicionar etapa.');
      }
    } catch (error) {
      console.error(error);
    }
  };

 
  const atualizarStatusEtapaAPI = async (etapaId: string, status: string) => {
    try {
      
      setEtapas(current => current.map(e => e.id === etapaId ? {...e, status} : e));
      
     
      await fetch(`http://localhost:3001/etapas/${etapaId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar etapa.');
    }
  };

  const handleIniciarEtapa = (etapaId: string) => {
    atualizarStatusEtapaAPI(etapaId, 'ANDAMENTO'); 
  };

  const handleConcluirEtapa = (etapaId: string) => {
    atualizarStatusEtapaAPI(etapaId, 'CONCLUIDA'); 
  };

  // --- TESTES ---

  const handleAdicionarTeste = async (novoTeste: any) => {
    try {
      const response = await fetch('http://localhost:3001/testes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...novoTeste,
          tipo: novoTeste.tipo.toUpperCase(), 
          aeronaveId: id
        }),
      });

      if (response.ok) {
        const testeCriado = await response.json();
        setTestes(current => [...current, testeCriado]);
        alert('Teste adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar teste.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResultadoTesteChange = async (testeId: string, novoResultado: string) => {
    try {
      // Atualiza visualmente
      setTestes(current => current.map(t => t.id === testeId ? {...t, resultado: novoResultado} : t));

      // Atualiza no banco
      await fetch(`http://localhost:3001/testes/${testeId}/resultado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultado: novoResultado.toUpperCase() }), // Garante maiúsculo
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Handlers de Modal de Funcionário
  const handleOpenModalFunc = (etapa: any) => {
    setEtapaSelecionada(etapa);
    setIsModalFuncOpen(true);
  };
  const handleCloseModalFunc = () => {
    setIsModalFuncOpen(false);
    setEtapaSelecionada(null);
  };

  const handleAssociarFuncionario = async (etapaId: string, funcionarioId: string) => {
    try {
      console.log(`Enviando requisição: Etapa ${etapaId}, Funcionario ${funcionarioId}`);

      const response = await fetch(`http://localhost:3001/etapas/${etapaId}/funcionarios`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        
        body: JSON.stringify({ 
          funcionarioId: funcionarioId 
        }),
      });

      if (response.ok) {
        alert('Funcionário associado com sucesso!');
        handleCloseModalFunc();
        
       
      } else {
        const errorData = await response.json();
        console.error('Erro da API:', errorData);
        alert(`Erro ao associar: ${errorData.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro de conexão com o servidor.');
    }
  };
  



  if (isLoading) return <div className={styles.container}><p>Carregando detalhes...</p></div>;
  if (!aeronave) return <div className={styles.container}><p>Aeronave não encontrada.</p></div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <Button onClick={() => router.back()} >
            &larr; Voltar
          </Button>
          <h2>Aeronave: {aeronave.modelo}</h2>
        </div>
        <p>Codigo: {aeronave.id} | Tipo: {aeronave.tipo} | Capacidade: {aeronave.capacidade}</p>
      </header>

      <nav className={styles.navAbas}>
        <button onClick={() => setAbaAtiva('pecas')} className={abaAtiva === 'pecas' ? styles.abaAtiva : styles.abaInativa}>Peças</button>
        <button onClick={() => setAbaAtiva('etapas')} className={abaAtiva === 'etapas' ? styles.abaAtiva : styles.abaInativa}>Etapas</button>
        <button onClick={() => setAbaAtiva('testes')} className={abaAtiva === 'testes' ? styles.abaAtiva : styles.abaInativa}>Testes</button>
      </nav>

      <main className={styles.mainContent}>
        {abaAtiva === 'pecas' && (
          <AbaPecas 
            pecas={pecas} 
            onStatusChange={handleStatusPecaChange}
            onAdicionarClick={() => setIsModalPecaOpen(true)}
          />
        )}
        {abaAtiva === 'etapas' && (
          <AbaEtapas 
            etapas={etapas} 
            onAssociarClick={handleOpenModalFunc}
            onAdicionarClick={() => setIsModalEtapaOpen(true)}
            onIniciarEtapa={handleIniciarEtapa}
            onConcluirEtapa={handleConcluirEtapa}
          />
        )}
        {abaAtiva === 'testes' && (
          <AbaTestes 
            testes={testes}
            onAdicionarClick={() => setIsModalTesteOpen(true)} 
            onResultadoChange={handleResultadoTesteChange}
          />
        )}
      </main>

      {/* Modais */}
      {isModalFuncOpen && etapaSelecionada && (
        <ModalAssociarFunc 
          etapa={etapaSelecionada}
          onClose={handleCloseModalFunc}
          onAssociar={handleAssociarFuncionario}
        />
      )}
      {isModalPecaOpen && <ModalAdicionarPeca onClose={() => setIsModalPecaOpen(false)} onAdicionar={handleAdicionarPeca} />}
      {isModalEtapaOpen && <ModalAdicionarEtapa onClose={() => setIsModalEtapaOpen(false)} onAdicionar={handleAdicionarEtapa} />}
      {isModalTesteOpen && <ModalAdicionarTeste onClose={() => setIsModalTesteOpen(false)} onAdicionar={handleAdicionarTeste} />}
    </div>
  );
}