// lab04.js
const https = require('https');
const fs = require('fs'); // Módulo nativo para o desafio bónus
const { URL } = require('url');

const visitados = new Set();
const todosLinks = new Set();
const LIMITE_PAGINAS = 5;
const URL_INICIAL = 'https://books.toscrape.com';

// Funções utilitárias estruturadas anteriormente
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
  const resultado = [];
  links.forEach(link => {
    try {
      const urlObj = new URL(link, urlBase);
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        resultado.push(urlObj.href);
      }
    } catch (e) {}
  });
  return resultado;
}

// Algoritmo principal do Crawler
async function crawl(url, profundidade = 0) {
  if (visitados.size >= LIMITE_PAGINAS) return;
  if (visitados.has(url)) return;

  visitados.add(url);
  console.log(`[${visitados.size}/${LIMITE_PAGINAS}] Visitando: ${url}`);

  try {
    // 1. Busca e processamento da página atual
    const html = await buscarHTML(url);
    const linksBrutos = extrairLinks(html);
    const linksNormalizados = normalizarLinks(linksBrutos, url);

    // 2. Acumula os links encontrados no Set global
    linksNormalizados.forEach(link => todosLinks.add(link));

    // 3. Se ainda não atingiu o nível máximo (profundidade < 1), mapeia links internos
    if (profundidade < 1) {
      const urlBaseObj = new URL(URL_INICIAL);
      
      for (const link of linksNormalizados) {
        // Verifica se pertence ao mesmo domínio para ser considerado interno
        const linkObj = new URL(link);
        if (linkObj.hostname === urlBaseObj.hostname) {
          if (visitados.size >= LIMITE_PAGINAS) break;
          // Executa recursivamente incrementando a profundidade
          await crawl(link, profundidade + 1);
        }
      }
    }
  } catch (err) {
    console.error(`Falha ao processar a rota: ${url} ->`, err.message);
  }
}

// Inicialização do Crawler
crawl(URL_INICIAL).then(() => {
  console.log(`\nTotal de links únicos mapeados: ${todosLinks.size}`);
  console.log(`Páginas visitadas: ${visitados.size}`);

  // --- DESAFIO EXTRA (BÓNUS) ---
  // Salva o resultado final em formato JSON estruturado
  const dadosParaSalvar = {
    paginasVisitadas: Array.from(visitados),
    linksColetados: Array.from(todosLinks)
  };

  fs.writeFile('links.json', JSON.stringify(dadosParaSalvar, null, 2), (err) => {
    if (err) {
      console.error('Erro ao gerar o arquivo JSON:', err.message);
    } else {
      console.log('Sucesso: Arquivo "links.json" gerado corretamente na raiz!');
    }
  });
});
