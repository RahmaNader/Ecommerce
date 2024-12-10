import {Category} from "@types";

export const sizes = ["S", "M", "L", "XL", "XXL"];
  
export const initialCategories: Category[] = [
  { name: "Jackets", isChecked: false },
  { name: "Coats", isChecked: false },
  { name: "Shirts", isChecked: false },
  { name: "Accessories", isChecked: false },
  { name: "Pants", isChecked: false },
  { name: "Shoes", isChecked: false },
  { name: "Hats", isChecked: false },
];

export const collections = [
  "All products",
  "Best sellers",
  "New arrivals",
  "Accessories",
];