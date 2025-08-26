// utils/filters.ts

// Normalize category keys to canonical slugs
function normalizeCategoryKey(categoryKey: string): string {
  const normalizedKey = categoryKey.trim();
  
  // Handle known problematic keys
  switch (normalizedKey) {
    case 'a.i.':
      return 'ai';
    case 'music video':
      return 'musicVideo';
    default:
      return normalizedKey;
  }
}

export function renderFilters(
  filters: string[] | undefined,
  t: (k: string) => string,
  i18nKeyPrefix = "homepage.categories."
): string {
  if (!filters || filters.length === 0) return "";
  
  const labels = filters
    .map((f) => normalizeCategoryKey(f)) // Normalize the category key first
    .map((f) => (t ? t(i18nKeyPrefix + f) : f)) // Then translate
    .map((s) => (s || "").toString().trim().toLowerCase()) // Then lowercase
    .filter(Boolean);

  if (labels.length <= 1) return labels[0] || "";

  // EXACTLY three spaces between labels; preserve using non-breaking spaces to avoid wrap collapse
  const sep = "\u00A0\u00A0\u00A0"; // 3 NBSPs
  return labels.join(sep);
}
