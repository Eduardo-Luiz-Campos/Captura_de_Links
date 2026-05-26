// lab03.js
const https = require('https');
const { URL } = require('url'); // módulo nativo

const URL_BASE = 'https://books.toscrape.com';

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

function normalizarLinks(links, urlBase) {
  const urlsValidas = new Set(); // TODO 3: remover duplicatas com Set

  links.forEach(link => {
    try {
      // TODO 1: usar new URL(link, urlBase) para resolver links relativos
      const urlNormalizada = new URL(link, urlBase);

      // TODO 2: filtrar apenas protocolos http e https
      if (urlNormalizada.protocol === 'http:' || urlNormalizada.protocol === 'https:') {
        urlsValidas.add(urlNormalizada.href);
      }
    } catch (e) {
      // Ignora links com formatos inválidos (ex: javascript:void(0) ou mailto:)
    }
  });

  return Array.from(urlsValidas);
}

// Execução integrada
buscarHTML(URL_BASE)
  .then(html => {
    const linksBrutos = extrairLinks(html);
    const linksAbsolutos = normalizarLinks(linksBrutos, URL_BASE);

    console.log(`Total de links absolutos únicos: ${linksAbsolutos.length}`);
    linksAbsolutos.forEach(url => console.log(url));
  })
  .catch(err => console.error('Erro:', err.message));
