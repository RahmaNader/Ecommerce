import { slugify } from "./slugify";

export const buildProductPath = (mainName: string, subName?: string) =>
  subName
    ? `/products/${slugify(mainName)}/${slugify(subName)}`
    : `/products/${slugify(mainName)}`;
