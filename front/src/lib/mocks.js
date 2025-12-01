

// =================================================================
// MOCK FUNCIONÁRIOS
// =================================================================
export const mockFuncionarios = [
  { 
    id: 'f-001', 
    nome: 'Ana Beatriz Silva', 
    funcao: 'Administrador', 
    telefone: '11987654321',
    usuario: 'admin', 
    senha: '123' 
  },
  { 
    id: 'f-002', 
    nome: 'Bruno Martins', 
    funcao: 'Engenheiro', 
    telefone: '11987654322',
    usuario: 'bruno.m', 
    senha: '123' 
  },
  { 
    id: 'f-003', 
    nome: 'Carla Dias', 
    funcao: 'Operador', 
    telefone: '11987654323',
    usuario: 'carla.d', 
    senha: '123' 
  },
  { 
    id: 'f-004', 
    nome: 'Daniel Oliveira', 
    funcao: 'Engenheiro', 
    telefone: '11987654324',
    usuario: 'daniel.o', 
    senha: '123' 
  },
  { 
    id: 'f-005', 
    nome: 'Eduarda Costa', 
    funcao: 'Operador', 
    telefone: '11987654325',
    usuario: 'eduarda.c', 
    senha: '123' 
  },
];

// =================================================================
// MOCK AERONAVES
export const mockAeronaves = [
  { 
    id: 'AC-001', 
    modelo: 'Condor-2025', 
    tipo: 'Comercial', 
    capacidade: 180 
  },
  { 
    id: 'AC-002', 
    modelo: 'Falcão-Militar', 
    tipo: 'Militar', 
    capacidade: 5 
  },
  { 
    id: 'AC-003', 
    modelo: 'SkyJet-Exec', 
    tipo: 'Executivo', 
    capacidade: 12 
  },
  { 
    id: 'AC-004', 
    modelo: 'Carga-Max', 
    tipo: 'Comercial', 
    capacidade: 6 
  }, // Esta aeronave estará "Concluída"
  { 
    id: 'AC-005', 
    modelo: 'Aurora-Vigilante', 
    tipo: 'Militar', 
    capacidade: 2 
  },
];

// =================================================================
// MOCK PEÇAS 
export const mockPecas = [
  { 
    id: 'p-001', 
    aeronaveId: 'AC-001', 
    nome: 'Turbina TX-500', 
    fornecedor: 'AeroCorp', 
    origem: 'Importada', 
    status: 'Pronta' 
  },
  { 
    id: 'p-002', 
    aeronaveId: 'AC-001', 
    nome: 'Fuselagem Principal', 
    fornecedor: 'BrasilComp', 
    origem: 'Nacional', 
    status: 'Em Produção' 
  },
  { 
    id: 'p-003', 
    aeronaveId: 'AC-002', 
    nome: 'Sistema de Radar v2', 
    fornecedor: 'DefSystems', 
    origem: 'Importada', 
    status: 'Em Transporte' 
  },
  { 
    id: 'p-004', 
    aeronaveId: 'AC-003', 
    nome: 'Interior de Luxo', 
    fornecedor: 'InterioresSA', 
    origem: 'Nacional', 
    status: 'Pronta' 
  },
  { 
    id: 'p-005', 
    aeronaveId: 'AC-004', 
    nome: 'Porta de Carga Frontal', 
    fornecedor: 'BrasilComp', 
    origem: 'Nacional', 
    status: 'Pronta' 
  },
];

// =================================================================
// MOCK ETAPAS

export const mockEtapas = [
  { 
    id: 'e-001', 
    aeronaveId: 'AC-001', 
    nome: 'Montagem da Fuselagem', 
    prazo: '30 dias', 
    status: 'Concluída' 
  },
  { 
    id: 'e-002', 
    aeronaveId: 'AC-001', 
    nome: 'Instalação Elétrica', 
    prazo: '15 dias', 
    status: 'Em Andamento' 
  },
  { 
    id: 'e-003', 
    aeronaveId: 'AC-001', 
    nome: 'Pintura e Acabamento', 
    prazo: '10 dias', 
    status: 'Pendente' 
  },
  { 
    id: 'e-004', 
    aeronaveId: 'AC-002', 
    nome: 'Integração de Armamentos', 
    prazo: '45 dias', 
    status: 'Pendente' 
  },
  { 
    id: 'e-005', 
    aeronaveId: 'AC-004', 
    nome: 'Montagem Final', 
    prazo: '20 dias', 
    status: 'Concluída' 
  },
];


export const mockTestes = [
  { 
    id: 't-001', 
    aeronaveId: 'AC-001', 
    tipo: 'Elétrico', 
    resultado: 'Aprovado' 
  },
  { 
    id: 't-002', 
    aeronaveId: 'AC-001', 
    tipo: 'Hidráulico', 
    resultado: 'Pendente' 
  },
  { 
    id: 't-003', 
    aeronaveId: 'AC-001', 
    tipo: 'Pressurização', 
    resultado: 'Pendente' 
  },
  { 
    id: 't-004', 
    aeronaveId: 'AC-002', 
    tipo: 'Radar', 
    resultado: 'Reprovado' 
  },
  { 
    id: 't-005', 
    aeronaveId: 'AC-004', 
    tipo: 'Aerodinâmico', 
    resultado: 'Aprovado' 
  }, 
];