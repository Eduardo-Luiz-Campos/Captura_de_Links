// lab01.js

const https = require('https');
const URL_ALVO = 'https://books.toscrape.com';

function buscarHTML(url) {
    return new Promise((resolve, reject) => {
    // TODO 1: usar https.get para buscar a URL
    // TODO 2: acumular os chunks em uma variável html
    // TODO 3: ao finalizar (evento 'end', chamar resolve(html)
    // TODO 4: em caso de erro, chamar reject(err)
    });
}

function extrairLinks(html) {
    // TODO 5: criar uma Regex com a flag 'g' para capturar href=&quot;...&quot;
    // TODO 6: retornar um array com todas as URLs encontradas
}

buscarHTML(URL_ALVO)
    .then(html => {
        const links = extrairLinks(html);
        console.log(`Total de links encontrados: ${links.length}`);
        links.forEach(link => console.log(link));

})
.catch(err => console.error('Erro:', err.message));