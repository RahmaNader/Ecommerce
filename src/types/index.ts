export type SignUpFormInputs = {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: string;
  day: string;
  month: string;
  year: string;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

// export interface CardComponent {
//   id: number;
//   src: string;
//   alt: string;
//   name: string;
//   priceAfterDiscount: number;
//   productPrice: number;
//   averageRate?: number;
//   productDescription?: string;
//   color?: string[];
//   size?: string[];
//   availableQuantity?: number;
//   category?: string;
//   collection?: string;
//   onClick?: () => void;
//   discountPercent?: number;
//   productQuantity?: number;
// }

export interface AddressProps {
  id: string;
  building: string;
  aptNo: string;
  floor: string;
  street: string;
  phoneNumber: string;
  country: string;
  city: string;
  additionalDirections?: string;
  saveAddress: boolean;
  shippingAddressId: string;
}
////////////////////////////////////////////////////

export interface ProductImage {
  imageId: number;
  imageUrl: string;
  altText: string;
}

export interface Review {
  reviewId: number;
  reviewContent: string;
  rate: number;
  createdAt: string;
  userName: string;
}

export interface SizeQuantity {
  sizeId: number;
  quantity: number;
  sizeLabel?: string | null;
}

export interface SizeQuantityResponse {
  $id: string;
  $values: SizeQuantity[];
}

export interface ProductVariant {
  productVarientId: number;
  colorNameEn: string;
  colorNameAr: string;
  colorName?: string | null;
  colorCode: string;
  sizeQuantities: SizeQuantity[];
}

export interface ProductImage {
  imageId: number;
  imageUrl: string;
  altText: string;
}

export interface Category {
  categoryID: number;
  name: string;
  nameAr: string;
  nameEn: string;
  parentCategoryID?: number | null;
  createdAt: string;
  slug?: string;
}

export interface CardComponent {
  productID: number;
  name: string;
  nameEn: string;
  nameAr: string;
  productDescription: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCode: string | null;
  productPrice: number;
  averageRate: number | null;
  productQuantity: number;
  categoryID: number;
  category: Category;
  reviews: Review[];
  productVarients: ProductVariant[];
  productImages: ProductImage[];
  reviewPercentages: Record<string, number>;
  created: string;
  lastUpdated: string;
  priceAfterDiscount: number;
  discountPercent: number;
  currentLanguage?: string; // Add this line
}

////////////////////////////////////////////////////
// Update your Product interface
export interface Product {
  id: number;
  name: string;
  DisPrice: number;
  NormalPrice: number;
  color: string;
  size: string;
  quantity: number;
  src?: string;
  alt?: string;
  // Add this property
  productVarientId?: number;
  // Other existing properties
  nameEn?: string;
  nameAr?: string;
  language?: string;
  productID?: number;
  discountPercent?: number;
  // Include any other properties that might be in your cart items
}

export type CouponStatus = "none" | "success" | "already_applied" | "invalid";

export interface OrderSummaryData {
  total: number;
  subTotal: number;
  shipping: number;
  couponDiscount: number;
  totalBeforeCoupon: number;
  totalAfterCoupon: number;
  deliveryDate: string;
  appliedCoupon?: string;
  couponStatus?: CouponStatus;
}

export interface OrderSummaryProps {
  products: Product[];
  showCheckoutButton?: boolean;
  onCheckoutClick?: () => void;
  currentStep?: "address" | "shipping" | "payment";
  onNextClick?: () => void;
  selectedPaymentMethod?: string;
  selectedAddress?: AddressProps | null;
  selectedShippingMethod?: string;
  isArabic?: boolean;
  isPlacingOrder?: boolean;
  orderError?: string | null;
}

export type RatingDistributionItem = {
  rating: number;
  percentage: string;
  color: string;
};

export type ReviewCardProps = {
  reviewerName: string;
  datePosted: string;
  reviewText: string;
  rating: number;
};

export type ProductsViewProps = {
  sectionName: string;
  cards: CardComponent[];
};

export type categoryProps = {
  SectionName: string;
};

export type CustomRatingProps = {
  rate: number;
  mode: "show" | "hide";
};

export type ProductCountProps = {
  initialCount?: number;
  onCountChange?: (count: number) => void;
};

export type FilterCategory = {
  name: string;
  isChecked: boolean;
};

export type NavLinkProps = {
  label: string | JSX.Element;
  to?: string;
  variant:
    | "navbar"
    | "footer"
    | "navbaricons"
    | "subnavbar"
    | "breadcrumb"
    | "sidebar"
    | "sidenavbar"
    | "sidenavbarsub";
  state?: { categoryId: number };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isActive?: boolean;
  DefaultIcon?: string;
  ActiveIcon?: string;
  className?: string;
};

export type PersonalData = {
  fullName: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
};

export interface PasswordResetData {
  email: string;
}

export type CreditCard = {
  type: string;
  number: string;
  nameOnCard: string;
  expiry: string;
  CVV: string;
};

export type Order = {
  orderNumber: string;
  total: string;
  date: string;
  status: string;
};

export type User = {
  username: string;
  token: string;
};

export interface OrderItem {
  $id?: string;
  orderItemId: string;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  priceAfterDiscount: number;
  subPrice: number;
  productColor: string;
  productSize: string;
  quantityRefunded: number;
  firstProductImageUrl: string;
}

// Update your UserOrder interface to match the actual API response

export interface UserOrder {
  orderId: string;
  userId: string;
  orderNumber: number;
  subTotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  status: number; // This will be matched against the OrderStatus enum
  orderDate: string;
  deliveredDate: string;
  shippedDate: string;
  outForDeliveryDate: string;
  estimadtedDelivereyDate: string;
  inProductionDate: string | null;
  preProductionDate: string | null;
  isCanceled: boolean; // Note: API uses 'isCanceled' not 'isCancelled'
  couponCode: string;
  shippingAddress: {
    shippingAdressId: string;
    buildingName: string;
    street: string;
    city: number;
    additionalDirections: string | null;
    flatNumber: number;
    floorNumber: number;
    phoneNumber: string;
    isSaved: boolean;
    isDefult: boolean;
    userId: string;
  };
  orderItems: {
    $values: Array<{
      orderItemId: string;
      productId: number;
      productName: string;
      quantity: number;
      unitPrice: number;
      priceAfterDiscount: number;
      subPrice: number;
      productColor: string;
      productSize: string;
      quantityRefunded: number;
      firstProductImageUrl: string;
    }>;
  };
}
