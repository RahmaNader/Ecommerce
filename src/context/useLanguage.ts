//src/context/useLanguage.ts
import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider"; // Import context

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
