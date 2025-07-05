/** slugify a display name (Arabic letters preserved) */
const slugify = (t: string) =>
  t
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "");

export function buildNamePath(mainName: string, subName?: string): string {
  return subName
    ? `/products/${slugify(mainName)}/${slugify(subName)}`
    : `/products/${slugify(mainName)}`;
}
