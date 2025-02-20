import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-96 bg-mainColor">
      <h1 className="text-8xl font-bold text-wine font-playfair">{t("notFound.title")}</h1>
      <p className="text-2xl text-ForthColor font-playfair px-6 text-center">{t("notFound.message")}</p>
      <Link
        to="/"
        className="px-6 py-2 text-mainColor bg-wine font-Poppins rounded hover:bg-ForthColor transition"
      >
         {t("notFound.goHome")}
      </Link>
    </div>
  );
};

export default NotFound;
