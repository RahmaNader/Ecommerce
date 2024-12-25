import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Product } from "@types";
import { Category, SuccessAlert, ErrorAlert } from "@components/atoms";
import { CartProduct, Breadcrumb } from "@components/molecules";
import OrderSummary from '@components/organisms/OrderSummary/OrderSummary';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      setProducts(JSON.parse(cartData));
    }
  }, []);

  const saveCartToCookies = (updatedProducts: Product[]) => {
    Cookies.set("cart", JSON.stringify(updatedProducts), { expires: 2 });
  };

  const removeProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    saveCartToCookies(updatedProducts);
  };

  const updateProductQuantity = (id: number, quantity: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity } : product
    );
    setProducts(updatedProducts);
    saveCartToCookies(updatedProducts);
  };






  const handleCheckoutClick = () => {
    const authToken = Cookies.get('authToken');
    const cartItems = Cookies.get('cart') ? JSON.parse(Cookies.get('cart') as string) : [];

    if (!authToken) {
      setAlert({
        type: 'error',
        message: 'Please login to proceed with checkout'
      });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    if (cartItems.length === 0) {
      setAlert({
        type: 'error',
        message: 'Your cart is empty'
      });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    Cookies.set('previousCart', JSON.stringify(products.map(p => ({ 
      id: p.id, 
      quantity: p.quantity 
    }))), { expires: 7 });
    navigate('/cart/checkout');
  };

  return (
    <div className="min-h-screen w-full px-2 md:px-10">
      <Breadcrumb />
      <Category SectionName={"Cart"} mdMyValue={"mt-2"} />

      {alert && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          role="alert"
        >
          {alert.type === "success" ? (
            <SuccessAlert message={alert.message} />
          ) : (
            <ErrorAlert message={alert.message} />
          )}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between w-full gap-6">
        {/* Cart Items */}
        <div className="md:w-7/12 w-full">
          {products.length > 0 ? (
            products.map((product) => (
              <CartProduct
                key={product.id}
                product={product}
                onRemove={() => removeProduct(product.id)}
                onQuantityChange={(quantity) =>
                  updateProductQuantity(product.id, quantity)
                }
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary */}
        <OrderSummary 
          products={products}
          showCheckoutButton={true}
          onCheckoutClick={handleCheckoutClick}
        />

      </div>
    </div>
  );
};

export default Cart;