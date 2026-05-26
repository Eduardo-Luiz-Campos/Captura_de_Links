// lab01.js

const https = require('https');
const URL_ALVO = 'https://books.toscrape.com';

function buscarHTML(url) {
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
    });
}

function extrairLinks(html) {
    // TODO 5: criar uma Regex com a flag 'g' para capturar href="..."
    const regex = /href="([^"]+)"/g;
    
    // TODO 6: retornar um array com todas as URLs encontradas
    const matches = [...html.matchAll(regex)];
    return matches.map(match => match[1]);
}

// Execução do script
buscarHTML(URL_ALVO)
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