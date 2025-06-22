import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@context/useLanguage";
import { ProductsDisplay } from "@components/organisms";
import { Breadcrumb, Loading } from "@components/molecules";
import { fetchCollection } from "@services/api/fetchCollections";
import { CardComponent } from "@types";
import { Category } from "@components/atoms";

const CollectionScreen: React.FC = () => {
  const { collectionType } = useParams<{ collectionType: string }>();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRTL = language === "ar";

  const [products, setProducts] = useState<CardComponent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      if (!collectionType) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCollection(collectionType);
        setProducts(data);
      } catch (err) {
        console.error(
          `[CollectionScreen] Error fetching ${collectionType}:`,
          err
        );
        setError(t("collection.errorLoading"));
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [collectionType, t]);

  const getCollectionTitle = () => {
    switch (collectionType) {
      case "new-arrivals":
        return t("collection.newArrivals");
      case "best-selling":
        return t("collection.bestSellers");
      case "highest-discount":
        return t("collection.highestDiscount");
      default:
        return t("collection.products");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-wine my-8">{error}</div>;

  return (
    <div
      className={`bg-customBeige min-h-screen p-2 md:p-10 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <Breadcrumb />

      <Category SectionName={getCollectionTitle()} mdMyValue={"mt-2"} />

      <div className="mt-8">
        {products.length > 0 ? (
          <ProductsDisplay products={products} />
        ) : (
          <p className="text-center text-lg text-gray-500">
            {t("collection.noProducts")}
          </p>
        )}
      </div>
    </div>
  );
};

export default CollectionScreen;
