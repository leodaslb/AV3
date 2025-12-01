'use client';
import { Button } from '@/components/ui/button';
import styles from './listaAeronaves.module.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'; 
import ModalAdicionarAeronave from '@/components/modals/ModalAdicionarAeronave';

export default function Aeronaves() {
  const router = useRouter();

  
  const [aeronaves, setAeronaves] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

 
  useEffect(() => {
    async function fetchAeronaves() {
      try {
        const response = await fetch('http://localhost:3001/aeronaves', {
          
          headers: {
            'x-start-time': Date.now().toString() 
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAeronaves(data);
        } else {
          console.error('Erro ao buscar aeronaves');
        }
      } catch (error) {
        console.error('Erro de conexão com a API:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAeronaves();
  }, []);

  // 2. CADASTRAR AERONAVE 
  const handleAdicionarAeronave = async (novaAeronave: any) => {
    try {
      const response = await fetch('http://localhost:3001/aeronaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaAeronave),
      });

      if (response.ok) {
        const aeronaveCriada = await response.json();
       
        setAeronaves((aeronavesAtuais) => [...aeronavesAtuais, aeronaveCriada]);
        alert('Aeronave cadastrada com sucesso!');
      } else {
        alert('Erro ao cadastrar. Verifique se o código já existe.');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão com o servidor.');
    }
  };
  
  const handleRowClick = (id: string) => {
    router.push(`/aeronaves/${id}`);
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Lista Aeronaves</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            + Adicionar Aeronave
          </Button>
        </div>

        {isLoading ? (
          <p>Carregando dados do sistema...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Capacidade</th>
              </tr>
            </thead>
            <tbody>
              {aeronaves.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{textAlign: 'center'}}>
                    Nenhuma aeronave encontrada.
                  </td>
                </tr>
              ) : (
                aeronaves.map((aeronave) => (
                  <tr
                    key={aeronave.id}
                    onClick={() => handleRowClick(aeronave.id)}
                    className={styles.linhaClicavel}
                  >
                    <td>{aeronave.id}</td>
                    <td>{aeronave.modelo}</td>
                    <td>{aeronave.tipo}</td>
                    <td>{aeronave.capacidade}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <ModalAdicionarAeronave 
          onClose={() => setIsModalOpen(false)}
          onAdicionar={handleAdicionarAeronave}
        />
      )}
    </>
  );
}