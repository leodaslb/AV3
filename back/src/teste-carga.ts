

const NUM_USUARIOS = 1;
const URL_ALVO = 'http://localhost:3001/aeronaves'; 

async function simularUsuario(id: number) {
  const start = Date.now();
  
  try {

    await fetch(URL_ALVO, {
      method: 'GET',
      headers: {
        'x-start-time': Date.now().toString()
      }
    });
    
    const end = Date.now();
    console.log(` Usuário ${id}: Requisição completada em ${end - start}ms (Tempo Total Percebido)`);
  } catch (error) {
    console.error(` Usuário ${id}: Erro na requisição`);
  }
}

async function iniciarTeste() {
  console.log(` Iniciando teste de carga com ${NUM_USUARIOS} usuários simultâneos...`);
  
  const promessas = [];
  
  // Cria as requisições simultâneas
  for (let i = 1; i <= NUM_USUARIOS; i++) {
    promessas.push(simularUsuario(i));
  }

  // Dispara todas ao mesmo tempo e espera terminarem
  await Promise.all(promessas);
  
  console.log(' Teste finalizado!');
}

iniciarTeste();