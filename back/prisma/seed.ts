import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o seed (dados estritos AV1/AV2)...');


  await prisma.teste.deleteMany();
  await prisma.peca.deleteMany();
  await prisma.etapa.deleteMany();
  await prisma.funcionario.deleteMany();
  await prisma.aeronave.deleteMany();

  console.log(' Criando funcionários...');
  await prisma.funcionario.createMany({
    data: [
      { id: 'f-001', nome: 'Ana Beatriz Silva', usuario: 'admin', senha: '123', telefone: '1199999999', nivelPermissao: 'ADMINISTRADOR' },
      { id: 'f-002', nome: 'Bruno Martins', usuario: 'bruno.m', senha: '123', telefone: '1188888888', nivelPermissao: 'ENGENHEIRO' },
      { id: 'f-003', nome: 'Carla Dias', usuario: 'carla.d', senha: '123', telefone: '1177777777', nivelPermissao: 'OPERADOR' },
      { id: 'f-004', nome: 'Daniel Oliveira', usuario: 'daniel.o', senha: '123', telefone: '1166666666', nivelPermissao: 'ENGENHEIRO' },
      { id: 'f-005', nome: 'Eduarda Costa', usuario: 'eduarda.c', senha: '123', telefone: '1155555555', nivelPermissao: 'OPERADOR' },
    ]
  });


  console.log('Criando aeronaves...');
  
  // AC-001: Comercial
  await prisma.aeronave.create({
    data: {
      id: 'AC-001', modelo: 'Condor-2025', tipo: 'COMERCIAL', capacidade: 180,
      pecas: {
        create: [
          { nome: 'Turbina TX-500', tipo: 'IMPORTADA', fornecedor: 'AeroCorp', status: 'PRONTA' },
          { nome: 'Fuselagem Principal', tipo: 'NACIONAL', fornecedor: 'BrasilComp', status: 'EM_PRODUCAO' }
        ]
      },
      etapas: {
        create: [
          { nome: 'Montagem da Fuselagem', prazo: '30 dias', status: 'CONCLUIDA' },
          { nome: 'Instalação Elétrica', prazo: '15 dias', status: 'ANDAMENTO' },
          { nome: 'Pintura e Acabamento', prazo: '10 dias', status: 'PENDENTE' }
        ]
      },
      testes: {
        create: [
          { tipo: 'ELETRICO', resultado: 'APROVADO' },
          { tipo: 'HIDRAULICO', resultado: 'PENDENTE' },
          { tipo: 'AERODINAMICO', resultado: 'PENDENTE' } 
        ]
      }
    }
  });


  await prisma.aeronave.create({
    data: {
      id: 'AC-002', modelo: 'Falcão-Militar', tipo: 'MILITAR', capacidade: 5,
      pecas: {
        create: [
          { nome: 'Sistema de Radar v2', tipo: 'IMPORTADA', fornecedor: 'DefSystems', status: 'EM_TRANSPORTE' }
        ]
      },
      etapas: {
        create: [
          { nome: 'Integração de Armamentos', prazo: '45 dias', status: 'PENDENTE' }
        ]
      },
      testes: {
        create: [

          { tipo: 'ELETRICO', resultado: 'REPROVADO' } 
        ]
      }
    }
  });

  // AC-003: Comercial
  await prisma.aeronave.create({
    data: {
      id: 'AC-003', modelo: 'SkyJet-Exec', tipo: 'COMERCIAL', capacidade: 12,
      pecas: {
        create: [
          { nome: 'Interior de Luxo', tipo: 'NACIONAL', fornecedor: 'InterioresSA', status: 'PRONTA' }
        ]
      }
    }
  });

  // AC-004: Comercial 
  await prisma.aeronave.create({
    data: {
      id: 'AC-004', modelo: 'Carga-Max', tipo: 'COMERCIAL', capacidade: 6,
      pecas: {
        create: [
          { nome: 'Porta de Carga Frontal', tipo: 'NACIONAL', fornecedor: 'BrasilComp', status: 'PRONTA' }
        ]
      },
      etapas: {
        create: [
          { nome: 'Montagem Final', prazo: '20 dias', status: 'CONCLUIDA' }
        ]
      },
      testes: {
        create: [
          { tipo: 'AERODINAMICO', resultado: 'APROVADO' }
        ]
      }
    }
  });

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });