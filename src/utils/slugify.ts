export const slugify = (txt: string) =>
  txt
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "");
