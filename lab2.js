// lab02.js
const https = require('https');
const DOMINIO_BASE = 'https://books.toscrape.com';

// Reutilização das funções do Exercício 1
function buscarHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', err => reject(err));
  });
}

function extrairLinks(html) {
  const regex = /href="([^"]+)"/g;
  return [...html.matchAll(regex)].map(m => m[1]);
}

// Implementação da classificação
function classificarLinks(links, dominio) {
  const internos = [];
  const externos = [];

  links.forEach(link => {
    // Verifica se inicia com barra relativa ou se inclui o domínio base
    if (link.startsWith('/') || link.includes(dominio)) {
      internos.push(link);
    } else {
      // Ignora links vazios ou apenas âncoras locais simples '#'
      if (link && link !== '#') {
        externos.push(link);
      }
    }
  });

  return { internos, externos };
}

// TODO: chamar buscarHTML, extrairLinks e depois classificarLinks
buscarHTML(DOMINIO_BASE)
  .then(html => {
    const links = extrairLinks(html);
    const resultado = classificarLinks(links, DOMINIO_BASE);

    console.log(`=== Links Internos: ${resultado.internos.length} ===`);
    resultado.internos.forEach(l => console.log(l));

    console.log(`\n=== Links Externos: ${resultado.externos.length} ===`);
    resultado.externos.forEach(l => console.log(l));
  })
  .catch(err => console.error('Erro:', err.message));
