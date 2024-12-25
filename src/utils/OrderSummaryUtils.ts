import Cookies from 'js-cookie';
import { OrderSummaryData, Product, CouponStatus } from '@types';

const validCoupons: { [key: string]: number } = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

export const calculateSummary = (products: Product[]): OrderSummaryData => {
  // Reset coupon if cart changed
  const cartChanged = hasCartChanged(products);
  if (cartChanged) {
    Cookies.remove('appliedCoupon');
    Cookies.remove('orderSummary');
  }

  const summary = products.reduce(
    (acc, product) => {
      acc.total += product.NormalPrice * product.quantity;
      acc.subTotal += product.DisPrice * product.quantity;
      acc.shipping += 50;
      return acc;
    },
    { total: 0, subTotal: 0, shipping: 0 }
  );

  const appliedCoupon = Cookies.get('appliedCoupon');
  const couponDiscount = appliedCoupon ? validCoupons[appliedCoupon] : 0;

  const totalBeforeCoupon = summary.subTotal + summary.shipping;
  const totalAfterCoupon = totalBeforeCoupon * (1 - couponDiscount);

  const orderSummary = {
    ...summary,
    couponDiscount,
    totalBeforeCoupon,
    totalAfterCoupon,
    deliveryDate: getDeliveryDate(),
    appliedCoupon
  };

  saveOrderSummary(orderSummary);

  return orderSummary;
};

export const applyCoupon = (code: string): CouponStatus => {
  if (!validCoupons[code]) {
    return 'invalid';
  }

  if (Cookies.get('appliedCoupon')) {
    return 'already_applied';
  }

  Cookies.set('appliedCoupon', code, { expires: 7 });
  return 'success';
};

export const getDeliveryDate = (): string => {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 7);
  return deliveryDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const saveOrderSummary = (summary: OrderSummaryData): void => {
  Cookies.set('orderSummary', JSON.stringify(summary), { expires: 7 });
};

const hasCartChanged = (products: Product[]): boolean => {
    const prevCart = Cookies.get('previousCart');
    const currentCart = JSON.stringify(products.map(p => ({ 
      id: p.id, 
      quantity: p.quantity 
    })));
    
    if (prevCart !== currentCart) {
      Cookies.set('previousCart', currentCart, { expires: 7 });
      return true;
    }
    
    return false;
  };