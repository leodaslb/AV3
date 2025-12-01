import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());


app.use((req, res, next) => {

  const serverStart = process.hrtime();
  const clientStartTime = req.headers['x-start-time'];

  res.on('finish', () => {
    const diff = process.hrtime(serverStart);
    const processingTimeMs = (diff[0] * 1e9 + diff[1]) / 1e6;

    let latenciaInfo = 'N/A (Falta cabeçalho)';
    
    if (clientStartTime) {
      const latencyOneWay = Date.now() - Number(clientStartTime);
      const latencyRoundTrip = latencyOneWay * 2; 
      
      latenciaInfo = `${latencyRoundTrip.toFixed(2)} ms (Estimada)`;
    }

    
    console.log(`\n[MÉTRICAS] ${req.method} ${req.url}`);
    console.log(`     Processamento:   ${processingTimeMs.toFixed(2)} ms`);
    console.log(`    Latência (Rede): ${latenciaInfo}`);
    console.log(`   ------------------------------------------------`);
  });

  next();
});



//LISTAR todas as aeronaves
app.get('/aeronaves', async (req, res) => {
  try {
    const aeronaves = await prisma.aeronave.findMany();
    res.json(aeronaves);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aeronaves' });
  }
});

// DETALHAR uma aeronave 
app.get('/aeronaves/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const aeronave = await prisma.aeronave.findUnique({
      where: { id },
      include: { 
        pecas: true,  
        testes: true,
        etapas: {
          include: {
            funcionarios: true 
          }
        }
      }
    });
    
    
    if (!aeronave) return res.status(404).json({ error: 'Aeronave não encontrada' });
    
    res.json(aeronave);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar detalhes da aeronave' });
  }
});

//CADASTRAR nova aeronave
app.post('/aeronaves', async (req, res) => {
  try {
    const { id, modelo, tipo, capacidade } = req.body;
    const novaAeronave = await prisma.aeronave.create({
      data: { id, modelo, tipo, capacidade }
    });
    res.status(201).json(novaAeronave);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aeronave. Verifique se o ID já existe.' });
  }
});

//  ADICIONAR peça a uma aeronave
app.post('/pecas', async (req, res) => {
  try {
    const { nome, tipo, fornecedor, status, aeronaveId } = req.body;
    const novaPeca = await prisma.peca.create({
      data: { nome, tipo, fornecedor, status, aeronaveId }
    });
    res.status(201).json(novaPeca);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar peça' });
  }
});

// ATUALIZAR status de uma peça
app.patch('/pecas/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Ex: { "status": "EM_PRODUCAO" }
  try {
    const pecaAtualizada = await prisma.peca.update({
      where: { id },
      data: { status }
    });
    res.json(pecaAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status da peça' });
  }
});


//  ADICIONAR etapa
app.post('/etapas', async (req, res) => {
  try {
    const { nome, prazo, aeronaveId } = req.body;
    const novaEtapa = await prisma.etapa.create({
      data: { nome, prazo, aeronaveId, status: 'PENDENTE' }
    });
    res.status(201).json(novaEtapa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar etapa' });
  }
});

// ATUALIZAR status da etapa (Iniciar/Concluir)
app.patch('/etapas/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const etapaAtualizada = await prisma.etapa.update({
      where: { id },
      data: { status }
    });
    res.json(etapaAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar etapa' });
  }
});


// ADICIONAR teste
app.post('/testes', async (req, res) => {
  try {
    const { tipo, aeronaveId } = req.body;
    const novoTeste = await prisma.teste.create({
      data: { tipo, aeronaveId, resultado: 'PENDENTE' }
    });
    res.status(201).json(novoTeste);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar teste' });
  }
});

// REGISTRAR resultado do teste
app.patch('/testes/:id/resultado', async (req, res) => {
  const { id } = req.params;
  const { resultado } = req.body;
  try {
    const testeAtualizado = await prisma.teste.update({
      where: { id },
      data: { resultado }
    });
    res.json(testeAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar teste' });
    console.log('erro')
  }
});


//  LISTAR funcionários
app.get('/funcionarios', async (req, res) => {
  try {
    const funcionarios = await prisma.funcionario.findMany();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar funcionários' });
  }
});

//  CADASTRAR funcionário
app.post('/funcionarios', async (req, res) => {
  try {
    const { id, nome, telefone, usuario, senha, nivelPermissao } = req.body;
    const novoFuncionario = await prisma.funcionario.create({
      data: { id, nome, telefone, usuario, senha, nivelPermissao }
    });
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
  }
});

//  LOGIN (Simples)
app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const funcionario = await prisma.funcionario.findUnique({
      where: { usuario }
    });

    if (funcionario && funcionario.senha === senha) {
      res.json({ mensagem: 'Login realizado com sucesso', usuario: funcionario });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.post('/etapas/:id/funcionarios', async (req, res) => {
  const { id } = req.params; 
  const { funcionarioId } = req.body; 

  try {
    const etapaAtualizada = await prisma.etapa.update({
      where: { id },
      data: {
        funcionarios: {
          connect: { id: funcionarioId } 
        }
      },
      include: { funcionarios: true }
    });
    res.json(etapaAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao associar funcionário' });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});