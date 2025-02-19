// src/context/LanguageProvider.tsx
import React, { createContext, useEffect, useState } from "react";
import i18n from "../i18n"; // Import i18n configuration

interface LanguageContextType {
  language: string;
  changeLanguage: (lng: "en" | "ar") => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("lng") || "en");

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lng", language);
  }, [language]);

  const changeLanguage = (lng: "en" | "ar") => {
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
