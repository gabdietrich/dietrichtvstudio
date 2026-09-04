#!/usr/bin/env node
// Pós-processa o output do `vite build` para gerar um index.html ESTÁTICO
// por hotpage de tratamento, com <meta property="og:..."> personalizadas.
//
// Por que isso é necessário:
//   O site é uma SPA. Crawlers de previews de link (WhatsApp, iMessage,
//   Slack, Telegram, e-mails, etc.) NÃO executam JavaScript — eles leem o
//   HTML servido pelo CDN. Sem este passo, todos os links abririam o
//   preview genérico da home. Com este passo, cada hotpage tem seu próprio
//   preview rico (título, descrição e imagem do tratamento).
//
// Fluxo:
//   1. Lê o build/index.html gerado pelo vite (que aponta para o bundle
//      atual `assets/index-XXXX.js`).
//   2. Para cada entrada do registry `src/data/tratamentos.json`:
//        - Cria a pasta build/tratamentos/<slug>/
//        - Escreve um index.html derivado do original, substituindo as
//          meta tags de OG, Twitter, robots e <title> com os dados do
//          tratamento.
//   3. O HTML resultante mantém o mesmo <script src="..."> da SPA, então
//      quando o navegador real carrega, a aplicação React assume e
//      renderiza o componente TratamentoPage normalmente.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const buildDir = resolve(rootDir, 'build');
const registryPath = resolve(rootDir, 'src/data/tratamentos.json');
const indexHtmlPath = resolve(buildDir, 'index.html');

const SITE_ORIGIN = 'https://dietrich.tv';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Aplica todas as substituições necessárias no HTML base para uma hotpage. */
function buildHtmlForTratamento(baseHtml, slug, t) {
  const url = `${SITE_ORIGIN}/tratamentos/${slug}`;
  const imageUrl = t.preview.image.startsWith('http')
    ? t.preview.image
    : `${SITE_ORIGIN}${t.preview.image}`;

  const title = escapeHtml(t.preview.title);
  const description = escapeHtml(t.preview.description);
  const imageAlt = escapeHtml(t.preview.title);

  let html = baseHtml;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  // <meta name="description">
  html = html.replace(
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${description}" />`
  );

  // Open Graph
  const ogReplacements = [
    ['og:type', 'video.other'],
    ['og:url', url],
    ['og:title', title],
    ['og:description', description],
    ['og:image', imageUrl],
    ['og:image:width', String(t.preview.imageWidth)],
    ['og:image:height', String(t.preview.imageHeight)],
    ['og:image:alt', imageAlt],
    ['og:locale', 'pt_BR'],
  ];
  for (const [prop, content] of ogReplacements) {
    const safe = escapeHtml(content);
    const propRegex = new RegExp(
      `<meta\\s+property="${prop.replace(/:/g, '\\:')}"[^>]*>`,
      'g'
    );
    const tag = `<meta property="${prop}" content="${safe}" />`;
    if (propRegex.test(html)) {
      html = html.replace(propRegex, tag);
    } else {
      // Adiciona dentro do <head> se não existir.
      html = html.replace(/<\/head>/, `    ${tag}\n  </head>`);
    }
  }

  // Twitter Card
  const twitterReplacements = [
    ['twitter:card', 'summary_large_image'],
    ['twitter:url', url],
    ['twitter:title', title],
    ['twitter:description', description],
    ['twitter:image', imageUrl],
  ];
  for (const [name, content] of twitterReplacements) {
    const safe = escapeHtml(content);
    const nameRegex = new RegExp(`<meta\\s+name="${name}"[^>]*>`, 'g');
    const tag = `<meta name="${name}" content="${safe}" />`;
    if (nameRegex.test(html)) {
      html = html.replace(nameRegex, tag);
    } else {
      html = html.replace(/<\/head>/, `    ${tag}\n  </head>`);
    }
  }

  // Bloqueia indexação por buscadores (mas crawlers de preview de link,
  // como o do WhatsApp, ignoram robots e ainda mostram o card — que é o
  // comportamento desejado aqui).
  if (/<meta\s+name="robots"/i.test(html)) {
    html = html.replace(
      /<meta\s+name="robots"[^>]*>/i,
      '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />'
    );
  } else {
    html = html.replace(
      /<\/head>/,
      '    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />\n  </head>'
    );
  }

  // Remove tag de keywords herdada (irrelevante para hotpage).
  html = html.replace(/<meta\s+name="keywords"[^>]*>\s*\n?/g, '');

  return html;
}

async function main() {
  const [registryRaw, baseHtml] = await Promise.all([
    readFile(registryPath, 'utf8'),
    readFile(indexHtmlPath, 'utf8'),
  ]);
  const registry = JSON.parse(registryRaw);

  const slugs = Object.keys(registry);
  if (slugs.length === 0) {
    console.log('[build-tratamentos] Nenhum tratamento no registry. Pulando.');
    return;
  }

  for (const slug of slugs) {
    const t = registry[slug];
    const html = buildHtmlForTratamento(baseHtml, slug, t);
    const outDir = resolve(buildDir, 'tratamentos', slug);
    await mkdir(outDir, { recursive: true });
    await writeFile(resolve(outDir, 'index.html'), html, 'utf8');
    console.log(
      `[build-tratamentos] gerado: build/tratamentos/${slug}/index.html`
    );
  }
}

main().catch((err) => {
  console.error('[build-tratamentos] falhou:', err);
  process.exit(1);
});
