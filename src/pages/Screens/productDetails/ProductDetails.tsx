import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cards } from "@data/cards";
import Loading from "@components/molecules/LoadingSkeleton/LoadingSkeleton";
import ProductSection from "@components/organisms/ProductSection/ProductSection";
import { CardComponent } from "@types";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<CardComponent | null>(null);

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
    <div className="flex flex-col gap-8">
      {/* Product Section */}
      <ProductSection product={product} />

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-bold">Reviews</h2>
        <p className="text-gray-500">This section is under construction.</p>
      </div>

      {/* Related Products Section */}
      <div>
        <h2 className="text-xl font-bold">Related Products</h2>
        <p className="text-gray-500">This section is under construction.</p>
      </div>
    </div>
  );
};

export default ProductDetails;
