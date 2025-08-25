import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function MetaUpdater() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Update document language
    document.documentElement.lang = i18n.language;

    // Update document title
    document.title = t('meta.title');

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t('meta.description'));
    }

    // Update meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', t('meta.keywords'));
    }

    // Update Open Graph title
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', t('meta.title'));
    }

    // Update Open Graph description
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', t('meta.ogDescription'));
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
      twitterTitleMeta.setAttribute('content', t('meta.title'));
    }

    // Update Twitter description
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescriptionMeta) {
      twitterDescriptionMeta.setAttribute('content', t('meta.ogDescription'));
    }

    // Update image alt text
    const ogImageAltMeta = document.querySelector('meta[property="og:image:alt"]');
    if (ogImageAltMeta) {
      ogImageAltMeta.setAttribute('content', t('meta.imageAlt'));
    }

  }, [t, i18n.language]);

  return null; // This component doesn't render anything
}
