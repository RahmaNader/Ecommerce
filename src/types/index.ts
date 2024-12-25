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

export type CardComponent = {
  id: number;
  src: string;
  alt: string;
  name: string;
  DisPrice: number;
  NormalPrice: number;
  rate: number;
  size: string[];
  category: string;
  collection: number;
  description: string;
  color: string[]; 
  availableQuantity: number; 
  onClick?: () => void;
};

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
}

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

export type Category  = {
  name: string;
  isChecked: boolean;
}

export type NavLinkProps = {
  label: string | JSX.Element;
  to?: string;
  variant: "navbar" | "footer" | "navbaricons" | "subnavbar" | "breadcrumb" | "sidebar" | "sidenavbar" | "sidenavbarsub";
  state?: never;
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
