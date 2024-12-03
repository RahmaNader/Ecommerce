import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cards } from "@data/cards";
import Loading from "@components/molecules/LoadingSkeleton/LoadingSkeleton";
import ProductSection from "@components/organisms/ProductSection/ProductSection";
import { CardComponent } from "@types";
import { Category } from '@components/atoms';
import { RatingSection, ReviewsSection } from "@components/organisms";
import { HomeSections } from "@components/molecules";
import { relatedProductsCards } from "@data/cards"



const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<CardComponent | null>(null);
  const ratingsData = [5, 4, 5, 5, 3, 2, 1, 5, 4, 5, 2, 3, 5, 5, 5, 1, 4, 3, 5, 5, 1, 2, 4, 5];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const foundProduct = cards.find((item) => item.id === Number(id)) || null;
      setProduct(foundProduct);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="text-center mt-8">
        <h1 className="text-2xl font-semibold">Product Not Found</h1>
        <p className="text-gray-500">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-10 w-full">
      {/* Product Section */}
      <ProductSection product={product} />
      
      {/* Divider */}
      <Category SectionName={"Rating And Reviews"} />

      {/* Reviews Section */}
      <RatingSection ratingsData={ratingsData} />
      {/* reviews section */}
      <ReviewsSection />

      {/* Related Products Section */}
      <HomeSections
              SectionName="Related Products"
              cards={relatedProductsCards}
            />
      

    </div>
  );
};

export default ProductDetails;
