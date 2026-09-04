import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SITE_ORIGIN = 'https://dietrich.tv';

interface MetaUpdaterProps {
  page?: 'work' | 'contact' | 'fornecedores' | 'project';
  projectData?: {
    title: string;
    description: string;
  };
}

function localePath(pathname: string) {
  const localeMatch = pathname.match(/^\/(pt|en)(.*)/);
  const locale = localeMatch?.[1] || 'en';
  const basePath = localeMatch ? localeMatch[2] || '/' : pathname;
  const normalizedBase = basePath === '' ? '/' : basePath;
  const pagePath = normalizedBase === '/' ? '/' : normalizedBase;
  const canonical = `${SITE_ORIGIN}/${locale}${pagePath === '/' ? '/' : pagePath}`;
  return { locale, pagePath, canonical };
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function MetaUpdater({ page = 'work', projectData }: MetaUpdaterProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;

    let title = t('meta.title');
    let description = t('meta.description');
    
    if (page === 'contact') {
      title = t('meta.contact.title');
      description = t('meta.contact.description');
    } else if (page === 'fornecedores') {
      title = 'Fornecedores | Dietrich.tv Studio';
      description = 'Cadastre-se como fornecedor e faça parte da nossa rede de parceiros. Dietrich.tv Studio - produtora especializada em filmmaking com I.A. de São Paulo, Brasil.';
    } else if (page === 'project' && projectData) {
      title = `${projectData.title} | Dietrich.tv Studio`;
      description = `${projectData.description} Watch this award-winning project by Dietrich.tv Studio, a production company specializing in A.I.-powered filmmaking from São Paulo, Brazil.`;
    }

    document.title = title;

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="keywords"]', 'content', t('meta.keywords'));
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:locale"]', 'content', i18n.language === 'pt' ? 'pt_BR' : 'en_US');
    setMeta('meta[property="og:site_name"]', 'content', 'Dietrich.tv Studio');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[property="og:image:alt"]', 'content', description);

    const { locale, pagePath, canonical } = localePath(window.location.pathname);
    const ogLocale = locale === 'pt' ? 'pt_BR' : 'en_US';
    setMeta('meta[property="og:locale"]', 'content', ogLocale);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[name="twitter:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', `${SITE_ORIGIN}/og-image.jpg`);
    setMeta('meta[name="twitter:image"]', 'content', `${SITE_ORIGIN}/og-image.jpg`);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    updateHreflangTags(pagePath);
  }, [t, i18n.language, page, projectData]);

  const updateHreflangTags = (pagePath: string) => {
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(tag => tag.remove());

    const suffix = pagePath === '/' ? '/' : pagePath;
    const tags = [
      { hreflang: 'pt-BR', href: `${SITE_ORIGIN}/pt${suffix}` },
      { hreflang: 'en', href: `${SITE_ORIGIN}/en${suffix}` },
      { hreflang: 'x-default', href: `${SITE_ORIGIN}/en${suffix}` }
    ];

    tags.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });
  };

  return null;
}
