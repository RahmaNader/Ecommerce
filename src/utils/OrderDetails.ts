export enum OrderStatus {
  Confirmed = 0,
  PreProduction = 1,
  InProduction = 2,
  Shipped = 3,
  OutForDelivery = 4,
  Delivered = 5,
  Cancelled = 6
}

export const getOrderStatusText = (status: number): string => {
  switch (status) {
    case OrderStatus.Confirmed:
      return "Confirmed";
    case OrderStatus.PreProduction:
      return "Pre-Production";
    case OrderStatus.InProduction:
      return "In Production";
    case OrderStatus.Shipped:
      return "Shipped";
    case OrderStatus.OutForDelivery:
      return "Out For Delivery";
    case OrderStatus.Delivered:
      return "Delivered";
    case OrderStatus.Cancelled:
      return "Cancelled";
    default:
      return "Unknown";
  }
};

export const isActiveOrder = (status: number): boolean => {
  return status !== OrderStatus.Delivered && status !== OrderStatus.Cancelled;
};

export const getOrderStatusClass = (status: number): string => {
  switch (status) {
    case OrderStatus.Confirmed:
      return "bg-blue-100 text-blue-800";
    case OrderStatus.PreProduction:
    case OrderStatus.InProduction:
      return "bg-purple-100 text-purple-800";
    case OrderStatus.Shipped:
    case OrderStatus.OutForDelivery:
      return "bg-amber-100 text-amber-800";
    case OrderStatus.Delivered:
      return "bg-green-100 text-green-800";
    case OrderStatus.Cancelled:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};