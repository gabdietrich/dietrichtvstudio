// utils/categoryUrls.ts
// Maps between URL slugs and internal category keys for shareable filter links.

export type Locale = 'pt' | 'en';
export type CategoryKey = 'all' | 'brands' | 'artistsCulture' | 'music' | 'researchAI';

const CATEGORY_TO_SLUG: Record<Locale, Record<Exclude<CategoryKey, 'all'>, string>> = {
  en: {
    brands: 'brands',
    artistsCulture: 'artists-culture',
    music: 'music',
    researchAI: 'research-ai',
  },
  pt: {
    brands: 'marcas',
    artistsCulture: 'artistas-cultura',
    music: 'musica',
    researchAI: 'pesquisa-ia',
  },
};

// Reverse lookup: slug -> category, per locale
const SLUG_TO_CATEGORY: Record<Locale, Record<string, CategoryKey>> = {
  en: Object.entries(CATEGORY_TO_SLUG.en).reduce((acc, [cat, slug]) => {
    acc[slug] = cat as CategoryKey;
    return acc;
  }, {} as Record<string, CategoryKey>),
  pt: Object.entries(CATEGORY_TO_SLUG.pt).reduce((acc, [cat, slug]) => {
    acc[slug] = cat as CategoryKey;
    return acc;
  }, {} as Record<string, CategoryKey>),
};

export function slugToCategory(slug: string, locale: Locale): CategoryKey | null {
  if (!slug) return null;
  return SLUG_TO_CATEGORY[locale][slug] ?? null;
}

export function categoryToSlug(category: string, locale: Locale): string | null {
  if (!category || category === 'all') return null;
  const map = CATEGORY_TO_SLUG[locale] as Record<string, string>;
  return map[category] ?? null;
}

// Check whether a given path segment (without leading slash) is a known filter slug
// in either locale. Useful when parsing URLs whose locale we want to detect from
// the segment itself.
export function isAnyFilterSlug(slug: string): boolean {
  return Boolean(SLUG_TO_CATEGORY.en[slug] || SLUG_TO_CATEGORY.pt[slug]);
}
