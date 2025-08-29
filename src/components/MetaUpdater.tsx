import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface MetaUpdaterProps {
  page?: 'work' | 'contact' | 'fornecedores' | 'project';
  projectData?: {
    title: string;
    description: string;
  };
}

export default function MetaUpdater({ page = 'work', projectData }: MetaUpdaterProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Update document language
    document.documentElement.lang = i18n.language;

    // Get title and description based on page type
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

    // Update document title
    document.title = title;

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }

    // Update meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', t('meta.keywords'));
    }

    // Update Open Graph title
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', title);
    }

    // Update Open Graph description
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', page === 'project' && projectData ? description : t('meta.ogDescription'));
    }

    // Update Open Graph locale
    const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
    if (ogLocaleMeta) {
      const locale = i18n.language === 'pt' ? 'pt_BR' : 'en_US';
      ogLocaleMeta.setAttribute('content', locale);
    }

    // Update Twitter title
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', title);
    }

    // Update Twitter description
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescriptionMeta) {
      twitterDescriptionMeta.setAttribute('content', page === 'project' && projectData ? description : t('meta.ogDescription'));
    }

    // Update image alt text
    const ogImageAltMeta = document.querySelector('meta[property="og:image:alt"]');
    if (ogImageAltMeta) {
      ogImageAltMeta.setAttribute('content', t('meta.imageAlt'));
    }

    // Update/add hreflang tags for SEO
    updateHreflangTags();

  }, [t, i18n.language, page, projectData]);

  const updateHreflangTags = () => {
    // Remove existing hreflang tags
    const existingHreflangTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangTags.forEach(tag => tag.remove());

    // Get current path without locale prefix
    const currentPath = window.location.pathname;
    const localeMatch = currentPath.match(/^\/(pt|en)(.*)/);
    const basePath = localeMatch ? localeMatch[2] || '/' : currentPath;
    const baseUrl = window.location.origin;

    // Create hreflang tags for both languages
    const hreflangTags = [
      { hreflang: 'pt-BR', href: `${baseUrl}/pt${basePath === '/' ? '/' : basePath}` },
      { hreflang: 'en', href: `${baseUrl}/en${basePath === '/' ? '/' : basePath}` },
      { hreflang: 'x-default', href: `${baseUrl}/en${basePath === '/' ? '/' : basePath}` } // Default to English
    ];

    // Add hreflang tags to head
    const head = document.head;
    hreflangTags.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      head.appendChild(link);
    });
  };

  return null; // This component doesn't render anything
}
