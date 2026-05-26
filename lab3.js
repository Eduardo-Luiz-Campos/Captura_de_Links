// lab03.js

const { URL } = require('url'); // módulo nativo
const URL_BASE = 'https://books.toscrape.com';
/**
    * Recebe um array de links (mistos) e a URL base.
    * Retorna um array de URLs absolutas únicas.
    * Links que não sejam http/https devem ser ignorados (ex: mailto:, javascript:).
*/
function normalizarLinks(links, urlBase) {
    // TODO 1: usar new URL(link, urlBase) para resolver links relativos
    // TODO 2: filtrar apenas protocolos http e https
    // TODO 3: remover duplicatas com Set
    return [];
}

// TODO: integrar com Exercícios anteriores e imprimir resultado