import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cards } from "@data/cards";
import Loading from "@components/molecules/LoadingSkeleton/LoadingSkeleton";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<typeof cards[0] | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const foundProduct = cards.find((item) => item.id === Number(id));
      setProduct(foundProduct || null);
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
    
    <div className="flex flex-col md:flex-row gap-8 p-8">
      
      {/* product */}
      <div>
        <div className="flex-1">
        <img
          src={product.src}
          alt={product.alt}
          className="w-full h-[400px] object-cover rounded-md"
        />
        <div className="flex gap-4 mt-4">
          
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-gray-200 rounded-md border border-gray-300"
            ></div>
          ))}
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p className="text-lg font-medium text-gray-700">
          Price: {product.DisPrice} EGP
        </p>
        <p className="text-sm line-through text-gray-500">
          Original Price: {product.NormalPrice} EGP
        </p>

        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xl ${
                i < product.rate ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>

        <div className="flex gap-4">
          <button className="w-32 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add to Cart
          </button>
          <button className="w-32 h-10 bg-green-500 text-white rounded-md hover:bg-green-600">
            Buy Now
          </button>
        </div>
      </div>
      </div>

      {/* reviews */}
      <div>
      </div>

      {/* related products */}
      <div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
