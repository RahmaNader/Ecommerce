import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  ReactNode,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCategories } from "@services/api/fetchCategories";
import { fetchFilteredProducts } from "@services/api/fetchFilteredProducts";
import { Category, CardComponent } from "@types";
import { buildProductPath } from "@utils/buildProductPath";

/* ---------- helpers ---------- */

const slugifyName = (t: string) =>
  t
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "");

/* ---------- state ---------- */

interface Filters {
  priceRange?: [number, number];
  sizeLabels?: string[];
  search?: string;
}

interface ShopState {
  categories: Category[];
  slugMap: Record<number, string>;
  idFromSlug: Record<string, number>;
  parentId: number | null;
  subId: number | null;
  filters: Filters;
  pageNumber: number;
  slugsChecked: boolean;
}

type Action =
  | { type: "SET_IDS"; parent: number | null; sub: number | null }
  | { type: "SLUGS_DONE" }
  | { type: "RESET_FILTERS" }
  | { type: "SET_FILTERS"; filters: Filters }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_CATEGORIES"; cats: Category[] };

const initialState: ShopState = {
  categories: [],
  slugMap: {},
  idFromSlug: {},
  parentId: null,
  subId: null,
  filters: {},
  pageNumber: 1,
  slugsChecked: false,
};

function reducer(state: ShopState, action: Action): ShopState {
  switch (action.type) {
    case "SET_CATEGORIES": {
      const slugMap: Record<number, string> = {};
      const idFromSlug: Record<string, number> = {};

      for (const c of action.cats) {
        // build one English & one Arabic slug (plus fallback)
        const slugs = [
          c.nameEn && slugifyName(c.nameEn),
          c.nameAr && slugifyName(c.nameAr),
          slugifyName(c.name),
        ].filter(Boolean) as string[];

        // first slug goes into slugMap ⇒ used when we *build* URLs
        if (!slugMap[c.categoryID]) slugMap[c.categoryID] = slugs[0];

        // every slug becomes a reverse-lookup key
        slugs.forEach((s) => {
          idFromSlug[s] = c.categoryID;
        });
      }

      return { ...state, categories: action.cats, slugMap, idFromSlug };
    }

    case "SET_IDS":
      return {
        ...state,
        parentId: action.parent,
        subId: action.sub,
        pageNumber: 1, // reset page on category change
        filters: {}, // reset filters on category change
      };
    case "SLUGS_DONE":
      return { ...state, slugsChecked: true };

    case "RESET_FILTERS":
      return { ...state, filters: {}, pageNumber: 1 };

    case "SET_FILTERS":
      return { ...state, filters: action.filters, pageNumber: 1 };

    case "SET_PAGE":
      return { ...state, pageNumber: action.page };

    default:
      return state;
  }
}

/* ---------- context ---------- */

interface ShopContextType extends ShopState {
  loadingCats: boolean;
  loadingProducts: boolean;
  products: CardComponent[];
  totalPages: number;
  setActiveIds: (parent: number | null, sub: number | null) => void;
  setFilters: (f: Filters) => void;
  resetFilters: () => void;
  setPageNumber: (p: number) => void;
  buildPath: (parent: number | null, sub?: number | null) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const { mainSlug, subSlug } = useParams<{
    mainSlug?: string;
    subSlug?: string;
  }>();

  /* ---------- categories ---------- */
  const {
    data: categories = [],
    isLoading: loadingCats,
    error: catErr,
  } = useQuery<Category[], Error>("allCategories", fetchCategories, {
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (categories.length) {
      dispatch({ type: "SET_CATEGORIES", cats: categories });
    }
  }, [categories]);

  /* ---------- slug → id on first mount ---------- */
  useEffect(() => {
    if (!state.categories.length) return;

    const parentId =
      mainSlug && state.idFromSlug[mainSlug] !== undefined
        ? state.idFromSlug[mainSlug]
        : null;
    const subId =
      subSlug && state.idFromSlug[subSlug] !== undefined
        ? state.idFromSlug[subSlug]
        : null;
    dispatch({ type: "SET_IDS", parent: parentId, sub: subId });
    dispatch({ type: "SLUGS_DONE" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.categories, mainSlug, subSlug]);

  /* ---------- buildPath helper ---------- */
  const buildPath = (parent: number | null, sub?: number | null) =>
    buildProductPath(state.slugMap, parent, sub);

  /* ---------- navigate on state changes ---------- */
  useEffect(() => {
    if (!state.parentId) return;

    const target = buildPath(state.parentId, state.subId ?? undefined);
    if (location.pathname !== target) navigate(target, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.parentId, state.subId]);

  /* ---------- products query ---------- */
  const pageSize = 12;

  const parentArr = useMemo(
    () => (state.parentId ? [state.parentId] : []),
    [state.parentId]
  );

  const categoryArr = useMemo(() => {
    if (state.subId) return [state.subId];
    if (!state.parentId) return undefined;
    // parent only: pass nothing and let backend pick its children
    return undefined;
  }, [state.parentId, state.subId]);

  const {
    data: prodData,
    isLoading: loadingProducts,
    error: prodErr,
  } = useQuery(
    [
      "products",
      parentArr.join(","),
      categoryArr?.join(",") ?? "",
      state.pageNumber,
      JSON.stringify(state.filters),
    ],
    () =>
      fetchFilteredProducts({
        parentCategories: parentArr,
        categoryIds: categoryArr,
        minPrice: state.filters.priceRange?.[0],
        maxPrice: state.filters.priceRange?.[1],
        sizeLabels: state.filters.sizeLabels,
        search: state.filters.search,
        pageNumber: state.pageNumber,
        pageSize,
        isEnglish: true, // language toggle handled by router
      }),
    {
      enabled: !!state.parentId || !!state.subId,
      keepPreviousData: true,
    }
  );

  /* ---------- exposed value ---------- */
  const value: ShopContextType = {
    ...state,
    loadingCats,
    loadingProducts,
    products: prodData?.products ?? [],
    totalPages: Math.ceil((prodData?.totalCount ?? 0) / pageSize),
    setActiveIds: (p, s) => dispatch({ type: "SET_IDS", parent: p, sub: s }),
    setFilters: (f) => dispatch({ type: "SET_FILTERS", filters: f }),
    resetFilters: () => dispatch({ type: "RESET_FILTERS" }),
    setPageNumber: (p) => dispatch({ type: "SET_PAGE", page: p }),
    buildPath,
  };

  if (catErr) console.error(catErr);
  if (prodErr) console.error(prodErr);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

/* ---------- hook ---------- */
export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
};
