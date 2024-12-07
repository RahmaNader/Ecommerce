export type SignUpFormInputs = {
  fullName: string;
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
  variant: "navbar" | "footer" | "navbaricons" | "subnavbar" | "breadcrumb" | "sidebar";
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