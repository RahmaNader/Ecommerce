import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import { CardComponent } from "@types";
import { fetchProductDetails } from "@services/api/fetchProductDetails";
import { fetchRelatedProducts } from "@services/api/fetchCollections";
import { Category } from "@components/atoms";
import { RatingSection, ProductSection, ReviewsSection } from "@components/organisms";
import { ProductsView, Loading } from "@components/molecules";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation(); 
  const isArabic = i18n.language === 'ar'; 
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<CardComponent | null>(null);
  const [error, setError] = useState<string | null>(null); 
  const [relatedProducts, setRelatedProducts] = useState<CardComponent[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await fetchProductDetails(Number(id));
        setProduct(data);
      } catch {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        if (!id) return;
        const relatedCards = await fetchRelatedProducts(Number(id), 4);
        setRelatedProducts(relatedCards);
      } catch (error) {
        console.error("Failed to load related products", error);
      }
    };

    loadRelatedProducts();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-20">{error}</div>;
  if (!product) return <div className="text-center mt-20">Product not found</div>;

  return (
    <div className={`flex flex-col gap-8 px-10 w-full ${isArabic ? 'rtl' : 'ltr'}`}>      <ProductSection product={product} isArabic={isArabic} />
      
      <Category SectionName={isArabic ? "التقييمات والمراجعات" : "Rating And Reviews"} />
      
      <RatingSection reviewPercentages={product.reviewPercentages} />
      
      <ReviewsSection reviews={product.reviews} />
      
      <ProductsView 
        sectionName={isArabic ? "المنتجات ذات الصلة" : "Related Products"} 
        cards={relatedProducts} 
      />
    </div>
  );
};

export default ProductDetails;