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
  userName: string;
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
  building: string;
  aptNo: string;
  floor: string;
  street: string;
  phoneNumber: string;
  country: string;
  city: string;
  additionalDirections?: string;
  saveAddress: boolean;
};

export interface ProductImage {
  $id: string;
  imageId: number;
  imageUrl: string;
  altText: string;
}

// export interface ProductReview {
//   $id: string;
//   $values: string[];
// }

// export interface ProductVariant {
//   $id: string;
//   $values: any[]; 
// }

export interface Review {
  reviewId: number;
  reviewContent: string;
  rate: number;
  createdAt: string; // ISO string for date
  userName: string;
}

export interface ProductVariant {
  colorId: number;
  sizeId: number;
  quantity: number;
  colorName: string;
  sizeLabel?: string | null;
}

export interface ProductImage {
  imageId: number;
  imageUrl: string;
  altText: string;
}

export interface Category {
  categoryID: number;
  name: string;
  parentCategoryID?: number | null;
  parentCategory?: Category | null;
  createdAt: string; // ISO string for date
}

export interface CardComponent {
  productID: number;
  name: string;
  productDescription?: string | null;
  productPrice: string;
  averageRate?: number;
  productQuantity?: number;
  categoryID: number;
  category?: Category;
  reviews?: Review[]; // Array of reviews
  productVarients?: ProductVariant[]; // Variants for colors and sizes
  productImages?: ProductImage[]; // Images associated with the product
  created?: string; // ISO string for date
  lastUpdated?: string; // ISO string for date
  priceAfterDiscount?: string;
  discountPercent?: string;
  onClick?: () => void;
  
}


////////////////////////////////////////////////////
export type Product = {
  id: number;
  name: string;
  DisPrice: number;
  color: string;
  size: string;
  quantity: number;
  NormalPrice: number;
}

export type CouponStatus = 'none' | 'success' | 'already_applied' | 'invalid';
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
}

export type RatingDistributionItem = {
  rating: number;
  percentage: string;
  color: string;
}

export type ReviewCardProps =  {
  reviewerName: string;
  datePosted: string;
  reviewText: string;
  rating: number;
}

export type ProductsViewProps = {
  sectionName: string;
  cards: CardComponent[];
};

export type categoryProps = {
  SectionName: string;
};

export type CustomRatingProps  = {
  rate: number;
  mode: 'show' | 'hide';
}

export type ProductCountProps = {
  initialCount?: number; 
  onCountChange?: (count: number) => void; 
};

//renamethis
export type FilterCategory  = {
  name: string;
  isChecked: boolean;
}

export type NavLinkProps = {
  label: string | JSX.Element;
  to?: string;
  variant: "navbar" | "footer" | "navbaricons" | "subnavbar" | "breadcrumb" | "sidebar" | "sidenavbar" | "sidenavbarsub";
  state?: { categoryId: number };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  isActive?: boolean;
  DefaultIcon?: string;
  ActiveIcon?: string;
};

export type PersonalData = {
  fullName: string;
  phoneNumber: string;
  address: string;
  email: string;
  password:string;
};

export type CreditCard = {
  type: string;
  number: string;
  nameOnCard: string;
  expiry: string;
  CVV: number;
}

export type Order = {
  orderNumber: string;
  total: string;
  date: string;
  status: string;
}

export type User = {
  username: string;
  token:string;
}
