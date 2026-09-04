const BASE_URL = 'https://dietrich.tv';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

// Project data for OG tags — keep in sync with WorkPage.tsx mockWorks
const PROJECTS: Record<string, { title: string; description: string; ogImage: string }> = {
  'gracinha': {
    title: 'Gracinha',
    description: 'A music film that blends pop, fantasy, and cinema. Directed by Gabriel Dietrich with Manu Gavassi.',
    ogImage: `${BASE_URL}/projects/gracinha-disney/gallery/gracinha-disney-gallery1.jpg`,
  },
  'ernesto-neto-for-le-bon-marche-rive-gauche': {
    title: 'Ernesto Neto for Le Bon Marché Rive Gauche',
    description: 'Capturing the artist before and after the exhibition. Where brand and art meet through cinema.',
    ogImage: `${BASE_URL}/projects/ernesto-neto-le-bon-marche/gallery/ernesto-neto-le-bon-marche-gallery1.jpg`,
  },
  'elsa-schiaparellis-private-album': {
    title: "Elsa Schiaparelli's Private Album",
    description: 'Elsa Schiaparelli remembered through an animated short film. A dialogue between fashion, memory, and the cosmos.',
    ogImage: `${BASE_URL}/projects/elsa-schiaparelli-private-album/gallery/elsa-schiaparelli-private-album-gallery1.png`,
  },
  'il-neige-rive-gauche': {
    title: 'Il Neige Rive Gauche',
    description: 'An animated winter tale for Le Bon Marché, where Paris becomes poetry.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  'three-short-films': {
    title: 'Three Short Films',
    description: 'Three short films with Manu Gavassi, blending fashion, music, and cinema.',
    ogImage: `${BASE_URL}/projects/manu-gavassi-three-films/gallery/manu-gavassi-three-films-gallery1.jpg`,
  },
  'azul-fidelidade-diamond-unique': {
    title: 'Diamond Unique',
    description: 'A loyalty program film for Azul Fidelidade, celebrating the Diamond Unique tier with cinematic elegance.',
    ogImage: `${BASE_URL}/projects/azul-fidelidade-diamond-unique/gallery/azul-fidelidade-diamond-unique-gallery1.jpg`,
  },
  'desejo': {
    title: 'Desejo',
    description: 'A sensorial film where intimacy, fragrance, and memory intertwine.',
    ogImage: `${BASE_URL}/projects/desejo-natura/gallery/desejo-natura-gallery1.jpg`,
  },
  'mothers-day-fernandas': {
    title: "Mother's Day Fernandas",
    description: 'Fernanda Torres and Fernanda Montenegro star in an intimate film celebrating motherhood.',
    ogImage: `${BASE_URL}/projects/mothers-day-hering-fernandas/gallery/mothers-day-hering-fernandas-gallery1.jpg`,
  },
  'gisele-bundchen-and-caua-raymond': {
    title: 'Gisele Bündchen and Cauã Reymond',
    description: 'A cinematic launch set to Jorge Ben Jor\'s classic Lá Vem Ela.',
    ogImage: `${BASE_URL}/projects/democrata-gisele-caua/gallery/democrata-gisele-caua-gallery1.jpg`,
  },
  'mothers-day-25': {
    title: "Mother's Day '25",
    description: 'Sasha, Bruna Marquezine, Xuxa and Neide — a celebration of generations and love.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  'brilho-lamelar': {
    title: 'Brilho Lamelar',
    description: 'Technology and beauty meet in a film where hair becomes light.',
    ogImage: `${BASE_URL}/projects/tresemme-brilho-lamelar/gallery/tresemme-brilho-lamelar-gallery1.jpg`,
  },
  'grand-soir-by-maison-francis-kurkdjian': {
    title: 'Grand Soir, by Maison Francis Kurkdjian',
    description: 'A spec film crafted entirely with artificial intelligence. 100% AI-made.',
    ogImage: `${BASE_URL}/projects/grand-soir-maison-francis/gallery/grand-soir-maison-francis-gallery1.jpg`,
  },
  'road': {
    title: 'The Road',
    description: 'A queer person crosses a road without asking permission to exist. Respeito is ON.',
    ogImage: `${BASE_URL}/projects/road/gallery/road-gallery1.png`,
  },
  'natura-homem': {
    title: 'Natura Homem - Identidad',
    description: 'A portrait of Brazilian masculinity with Lázaro Ramos, culminating in a gesture of affection between two men at a samba circle.',
    ogImage: `${BASE_URL}/projects/natura-homem/gallery/natura-homem-gallery1.jpg`,
  },
  'yanbal-genactive': {
    title: 'Yanbal Genactive',
    description: "Yanbal is Peru's largest cosmetics brand, and Genactive is the top of its line.",
    ogImage: `${BASE_URL}/projects/yanbal-genactive/gallery/yanbal-genactive-gallery1.jpg`,
  },
};

// Social media and link-preview bots
const BOT_UA = /facebookexternalhit|facebot|twitterbot|whatsapp|linkedinbot|telegrambot|slackbot|discordbot|applebot|googlebot|bingbot|yandex|ia_archiver|rogerbot|embedly|quora|outbrain|vkshare|w3c_validator|preview|Iframely|Twitterbot|Pinterest/i;

function isBot(ua: string): boolean {
  return BOT_UA.test(ua);
}

function firstPathSegment(pathname: string): string | undefined {
  return pathname.split('/').filter(Boolean)[0];
}

function isLocalePrefixed(pathname: string): boolean {
  const first = firstPathSegment(pathname);
  return first === 'en' || first === 'pt';
}

function isLocaleHome(pathname: string): boolean {
  const segs = pathname.split('/').filter(Boolean);
  return segs.length === 1 && (segs[0] === 'en' || segs[0] === 'pt');
}

const HOME_META = {
  en: {
    title: 'Dietrich.tv Studio · Director-led post-production',
    description: 'Dietrich.tv Studio is a São Paulo–based practice working across film, advertising, fashion, and art, on a director-led post-production model.',
    locale: 'en_US',
  },
  pt: {
    title: 'Dietrich.tv Studio · Director-led post-production',
    description: 'Dietrich.tv Studio é um estúdio de São Paulo que atua em cinema, publicidade, moda e arte, num modelo de director-led post-production.',
    locale: 'pt_BR',
  },
} as const;

function extractSlug(pathname: string): string | null {
  // Strip optional locale prefix: /en/slug or /pt/slug -> slug
  const normalized = pathname.replace(/^\/(en|pt)\//, '/');
  const match = normalized.match(/^\/([^/]+)\/?$/);
  const slug = match ? match[1] : null;
  if (slug === 'en' || slug === 'pt' || slug === 'contact' || slug === 'fornecedores') return null;
  return slug;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectPageMeta(html: string, opts: {
  title: string;
  description: string;
  pageUrl: string;
  ogImage?: string;
  locale?: string;
  htmlLang?: string;
}): string {
  const title = escapeHtml(opts.title);
  const description = escapeHtml(opts.description);
  const pageUrl = opts.pageUrl;
  const ogImage = opts.ogImage;
  let out = html
    .replace(/(<title>)[^<]*(<\/title>)/, `$1${title}$2`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/g, `$1${description}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/g, `$1${title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/g, `$1${description}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/g, `$1${pageUrl}$2`)
    .replace(/(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/g, `$1${description}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/g, `$1${title}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/g, `$1${description}$2`)
    .replace(/(<meta\s+name="twitter:url"\s+content=")[^"]*(")/g, `$1${pageUrl}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/g, `$1${pageUrl}$2`);

  if (ogImage) {
    out = out
      .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/g, `$1${ogImage}$2`)
      .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/g, `$1${ogImage}$2`);
  }
  if (opts.locale) {
    out = out.replace(/(<meta\s+property="og:locale"\s+content=")[^"]*(")/g, `$1${opts.locale}$2`);
  }
  if (opts.htmlLang) {
    out = out.replace(/(<html\s+lang=")[^"]*(")/, `$1${opts.htmlLang}$2`);
  }
  return out;
}

export default async (request: Request, context: any) => {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Always skip static assets
    if (
      pathname.includes('.') ||
      pathname.startsWith('/_') ||
      pathname.startsWith('/api/')
    ) {
      return context.next();
    }

    const userAgent = request.headers.get('user-agent') || '';

    // For social bots: inject locale home or project-specific OG tags
    if (isBot(userAgent)) {
      if (isLocaleHome(pathname)) {
        const lang = firstPathSegment(pathname) as 'en' | 'pt';
        const meta = HOME_META[lang];
        const pageUrl = `${BASE_URL}/${lang}/`;
        const baseRes = await fetch(`${BASE_URL}/index.html`);
        let html = await baseRes.text();
        html = injectPageMeta(html, {
          title: meta.title,
          description: meta.description,
          pageUrl,
          locale: meta.locale,
          htmlLang: lang,
        });
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }

      const slug = extractSlug(pathname);
      const project = slug ? PROJECTS[slug] : null;

      if (project) {
        const pageUrl = `${BASE_URL}${pathname.startsWith('/en') || pathname.startsWith('/pt') ? pathname : `/en/${slug}`}`;
        const baseRes = await fetch(`${BASE_URL}/index.html`);
        let html = await baseRes.text();
        html = injectPageMeta(html, {
          title: `Dietrich.tv Studio · ${project.title}`,
          description: project.description,
          pageUrl,
          ogImage: project.ogImage,
        });

        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }

      // Non-project bot request — serve index.html directly (no redirect needed)
      return context.next();
    }

    // ── Regular user: locale redirect logic ──────────────────────────────────

    // Skip if already has locale prefix or is a tratamento hotpage
    if (
      isLocalePrefixed(pathname) ||
      pathname.startsWith('/videos/') ||
      pathname.startsWith('/projects/') ||
      pathname.startsWith('/logos_clients/') ||
      pathname.startsWith('/tratamentos/')
    ) {
      return context.next();
    }

    // Check for language cookie first (cookie always wins)
    const cookieHeader = request.headers.get('cookie') || '';
    const cookieMatch = cookieHeader.match(/(?:^|;\s*)lang=(pt|en)(?:;|$)/);
    const cookieLang = cookieMatch?.[1];

    let detectedLang = 'en';

    if (cookieLang === 'pt' || cookieLang === 'en') {
      detectedLang = cookieLang;
    } else {
      try {
        const country = context?.geo?.country?.toUpperCase() || '';
        if (country === 'BR') {
          detectedLang = 'pt';
        }
      } catch {
        try {
          const acceptLanguage = request.headers.get('accept-language') || '';
          if (acceptLanguage.toLowerCase().includes('pt-br') || acceptLanguage.toLowerCase().includes('pt')) {
            detectedLang = 'pt';
          }
        } catch {
          // keep 'en'
        }
      }
    }

    const newUrl = new URL(request.url);
    newUrl.pathname = pathname === '/' ? `/${detectedLang}/` : `/${detectedLang}${pathname}`;

    return Response.redirect(newUrl.toString(), 302);
  } catch (error) {
    console.error('Edge function error:', error);
    return context.next();
  }
};

export const config = {
  path: '/*',
};
