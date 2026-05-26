// lab04.js — Estrutura sugerida
const visitados = new Set();
const todosLinks = new Set();
const LIMITE_PAGINAS = 5;
async function crawl(url, profundidade = 0) {
    if (visitados.size >= LIMITE_PAGINAS) return;
    if (visitados.has(url)) return;
    visitados.add(url);
    
    console.log(`[${visitados.size}/${LIMITE_PAGINAS}] Visitando: ${url}`);
    // TODO: buscar HTML, extrair links, normalizar
    // TODO: se profundidade < 1, chamar crawl para cada link interno
    // TODO: acumular todos os links em todosLinks
}
crawl('https://books.toscrape.com').then(() => {
    console.log(`\nTotal de links únicos: ${todosLinks.size}`);
    console.log(`Páginas visitadas: ${visitados.size}`);
});