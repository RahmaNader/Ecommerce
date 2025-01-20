import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailedProduct } from "@services/api/fetchProductDetails";
import { fetchProductDetails } from "@services/api/fetchProductDetails";
import { Category } from "@components/atoms";
import { RatingSection, ReviewsSection, ProductSection } from "@components/organisms";
import { ProductsView, Loading } from "@components/molecules";
import { productsViewCards } from "@data/cards";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <Loading />;
  if (error) return <div className="text-center mt-20">{error}</div>;
  if (!product) return <div className="text-center mt-20">Product not found</div>;

  return (
    <div className="flex flex-col gap-8 px-10 w-full">
      
      <ProductSection product={product} />
      
      <Category SectionName={"Rating And Reviews"} />
      
      <RatingSection ratingsData={product.reviews?.map(review => review.rate) || []} />
      
      <ReviewsSection reviews={product.reviews} />
      
      <ProductsView sectionName="Related Products" cards={productsViewCards} />
    </div>
  );
};

export default ProductDetails;