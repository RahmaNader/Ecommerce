// encode <=> decode as plain functions to avoid an extra dependency
export interface RawFilters {
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[]; // comma-separated in the URL
  search?: string;
  page?: number; // not part of <Filters> in state, but lives beside them
}

export const filtersFromSearch = (sp: URLSearchParams): RawFilters => ({
  minPrice: sp.get("min") ? +sp.get("min")! : undefined,
  maxPrice: sp.get("max") ? +sp.get("max")! : undefined,
  sizes: sp.get("sizes") ? sp.get("sizes")!.split(",") : undefined,
  search: sp.get("q") || undefined,
  page: sp.get("page") ? +sp.get("page")! : undefined,
});

export const filtersToSearch = (f: RawFilters): string => {
  const sp = new URLSearchParams();
  if (f.minPrice !== undefined) sp.set("min", f.minPrice.toString());
  if (f.maxPrice !== undefined) sp.set("max", f.maxPrice.toString());
  if (f.sizes && f.sizes.length) sp.set("sizes", f.sizes.join(","));
  if (f.search) sp.set("q", f.search);
  if (f.page && f.page > 1) sp.set("page", f.page.toString()); // cheap SEO win
  const s = sp.toString();
  return s ? `?${s}` : "";
};
