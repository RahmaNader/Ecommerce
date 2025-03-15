import axios from "axios";

export interface Coupon {
  couponId: string;
  title: string;
  couponCode: string;
  startDate: string;
  endDate: string;
  type: number; // 0 = fixed amount, 1 = percentage
  value: number;
  quantity: number;
  allowFreeShipping: boolean;
  isUsed: boolean;
  isDeleted: boolean;
  isExpired: boolean;
}

interface CouponResponse {
  $id: string;
  $values: Array<{
    $id: string;
    couponId: string;
    title: string;
    couponCode: string;
    startDate: string;
    endDate: string;
    type: number;
    value: number;
    quantity: number;
    allowFreeShipping: boolean;
    isUsed: boolean;
    isDeleted: boolean;
    isExpired: boolean;
  }>;
}

export async function fetchCoupons(): Promise<Coupon[]> {
  try {
    const { data } = await axios.get<CouponResponse>(
      "https://www.bouraq-mt.com/royalkey/api/Coupons"
    );

    // Transform API response to our Coupon interface
    return data.$values.map((coupon): Coupon => ({
      couponId: coupon.couponId,
      title: coupon.title,
      couponCode: coupon.couponCode,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      type: coupon.type,
      value: coupon.value,
      quantity: coupon.quantity,
      allowFreeShipping: coupon.allowFreeShipping,
      isUsed: coupon.isUsed,
      isDeleted: coupon.isDeleted,
      isExpired: coupon.isExpired
    }));
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw new Error("Failed to fetch coupons");
  }
}

export async function validateCoupon(couponCode: string): Promise<Coupon | null> {
  try {
    const coupons = await fetchCoupons();
    const validCoupon = coupons.find(
      coupon => 
        coupon.couponCode.toLowerCase() === couponCode.toLowerCase() && 
        !coupon.isExpired && 
        !coupon.isUsed &&
        coupon.quantity > 0
    );
    return validCoupon || null;
  } catch (error) {
    console.error("Error validating coupon:", error);
    return null;
  }
}