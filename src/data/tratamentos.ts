// Registry de tratamentos de direção (hotpages privadas).
//
// O slug da URL é composto por: "<slug-legível>-<token>".
// O token é uma string base64url de 16 caracteres (~95 bits de entropia),
// suficiente para tornar a URL impossível de adivinhar ou enumerar.
//
// Importante:
// - Nenhum link no site público deve apontar para essas páginas.
// - O caminho /tratamentos/* está excluído do edge function de locale-redirect
//   e bloqueado no robots.txt.
// - O script `scripts/build-tratamentos.mjs` gera um index.html estático por
//   hotpage com as <meta> de preview (Open Graph / Twitter Card) para que
//   crawlers e clientes que não executam JS (WhatsApp, Slack, e-mail, etc.)
//   mostrem o card de preview corretamente.
//
// Os dados ficam em `tratamentos.json` para que o script de build (Node ESM
// puro, sem runtime TS) consiga importá-los diretamente.

import tratamentosData from './tratamentos.json';

export interface Tratamento {
  titulo: string;
  subtitulo: string;
  credito: string;
  textoMoldura: string;
  vimeo: {
    videoId: string;
    hash: string;
    iframeTitle: string;
    /**
     * Código de legenda a ativar automaticamente no player.
     * Ex: "pt" (uploaded), "pt-x-autogen" (gerada pelo Vimeo AI),
     * "en", "en-x-autogen". Omitir para não ativar legendas.
     */
    texttrack?: string;
  };
  rodape: {
    direcao: string;
    produtora: string;
  };
  preview: {
    title: string;
    description: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
  };
}

export const tratamentos = tratamentosData as Record<string, Tratamento>;

// Lookup case-insensitive: o Netlify (e a maioria dos CDNs) normaliza paths
// para lowercase em redirects de pretty-URL. As chaves no JSON ficam em
// lowercase, mas aceitamos qualquer case na URL.
export function getTratamentoBySlug(slug: string): Tratamento | undefined {
  return tratamentos[slug] ?? tratamentos[slug.toLowerCase()];
}
