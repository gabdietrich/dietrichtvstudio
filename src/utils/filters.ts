// utils/filters.ts
export function renderFilters(
  filters: string[] | undefined,
  t: (k: string) => string,
  i18nKeyPrefix = "homepage.categories."
): string {
  if (!filters || filters.length === 0) return "";
  const labels = filters
    .map((f) => (t ? t(i18nKeyPrefix + f) : f))
    .map((s) => (s || "").toString().trim().toLowerCase())
    .filter(Boolean);

  if (labels.length <= 1) return labels[0] || "";

  // EXACTLY three spaces between labels; preserve using non-breaking spaces to avoid wrap collapse
  const sep = "\u00A0\u00A0\u00A0"; // 3 NBSPs
  return labels.join(sep);
}
