// lab01.js
const https = require('https');
const URL_ALVO = 'https://books.toscrape.com';

function buscarHTML(url) {
<<<<<<< HEAD
  return new Promise((resolve, reject) => {
    // TODO 1: usar https.get para buscar a URL
    https.get(url, (res) => {
      let html = '';

      // TODO 2: acumular os chunks em uma variável html
      res.on('data', chunk => {
        html += chunk;
      });

      // TODO 3: ao finalizar (evento 'end'), chamar resolve(html)
      res.on('end', () => {
        resolve(html);
      });

    }).on('error', (err) => {
      // TODO 4: em caso de erro, chamar reject(err)
      reject(err);
=======
    return new Promise((resolve, reject) => {
        //usar a variável 'url' por parâmetro
        https.get(url, (res) => {
            // TODO 2: acumular os chunks em uma variável html
            let html = '';
            res.on('data', chunk => html += chunk);

            // TODO 3: ao finalizar (evento 'end', chamar resolve(html)
            res.on('end', () => {
                resolve(html);
            });
            
        }).on('error', (err) => {
            // TODO 4: em caso de erro, chamar reject(err)
            reject(err);
        });
>>>>>>> 52a4f460e17ab9d5e084acec0a60372e50e33cbd
    });
  });
}

function extrairLinks(html) {
<<<<<<< HEAD
  // TODO 5: criar uma Regex com a flag 'g' para capturar href="..."
  const regex = /href="([^"]+)"/g;
  
  // TODO 6: retornar um array com todas as URLs encontradas
  const matches = [...html.matchAll(regex)];
  return matches.map(m => m[1]); // m[1] extrai o grupo de captura interno
=======
    // TODO 5: criar uma Regex com a flag 'g' para capturar href="..."
    const regex = /href="([^"]+)"/g;
    
    // TODO 6: retornar um array com todas as URLs encontradas
    const matches = [...html.matchAll(regex)];
    return matches.map(match => match[1]);
>>>>>>> 52a4f460e17ab9d5e084acec0a60372e50e33cbd
}

// Execução do script
buscarHTML(URL_ALVO)
<<<<<<< HEAD
  .then(html => {
    const links = extrairLinks(html);
    console.log(`Total de links encontrados: ${links.length}`);
    links.forEach(link => console.log(link));
  })
  .catch(err => console.error('Erro:', err.message));

/* 
===================================================================
Perguntas de reflexão (Respostas)
===================================================================
1. O que acontece se a URL usar HTTP em vez de HTTPS? O mesmo módulo funciona?
Resposta: Não, o módulo 'https' nativo não consegue processar requisições HTTP comuns. 
Se for passada uma URL HTTP, ocorrerá um erro ou comportamento inesperado de rede. 
Seria necessário usar o módulo 'http' nativo para URLs não criptografadas.

2. Por que o evento 'data' pode ser disparado múltiplas vezes?
Resposta: Porque a resposta HTTP é transmitida pela rede em fragmentos chamados de "chunks". 
O Node.js lê esses pacotes de fluxo de dados (streams) de forma assíncrona conforme eles chegam da rede, 
evitando carregar arquivos massivos de uma vez só na memória.
*/
=======
    .then(html => {
        const links = extrairLinks(html);
        console.log(`Total de links encontrados: ${links.length}`);
        links.forEach(link => console.log(link));
    })
    .catch(err => console.error('Erro:', err.message));

//1. O que acontece se a URL usar HTTP em vez de HTTPS? O mesmo módulo funciona?
    //Ele quebra o node e não funciona, já que precisa de outra função
//2. Por que o evento 'data' pode ser disparado múltiplas vezes?
    //Pois quando pede o HTML de um site, o servidor envia o arquivo quebrado em pacotes menores
    //para que eles possam viajar pela rede de forma mais rápida e eficiente.
>>>>>>> 52a4f460e17ab9d5e084acec0a60372e50e33cbd
