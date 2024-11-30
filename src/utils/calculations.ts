export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
    if (originalPrice <= 0) {
      throw new Error("Original price must be greater than 0");
    }
    if (discountedPrice < 0 || discountedPrice > originalPrice) {
      throw new Error("Discounted price must be between 0 and the original price");
    }
  
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discountPercentage * 100) / 100; 
  };
  