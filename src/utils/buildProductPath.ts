export const buildProductPath = (
  slugMap: Record<number, string>,
  parentId: number | null,
  subId?: number | null
): string =>
  parentId
    ? subId
      ? `/products/${slugMap[parentId]}/${slugMap[subId]}`
      : `/products/${slugMap[parentId]}`
    : "/products";
