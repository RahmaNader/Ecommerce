export enum OrderStatus {
  Confirmed = "Confirmed",
  PreProduction = "PreProduction",
  InProduction = "InProduction",
  Shipped = "Shipped",
  OutForDelivery = "OutForDelivery",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

const numberToStatus: Record<number, OrderStatus> = {
  1: OrderStatus.Confirmed,
  2: OrderStatus.PreProduction,
  3: OrderStatus.InProduction,
  4: OrderStatus.Shipped,
  5: OrderStatus.OutForDelivery,
  6: OrderStatus.Delivered,
  7: OrderStatus.Cancelled,
};

type StatusInput = OrderStatus | number | string;

const toStatusEnum = (raw: StatusInput): OrderStatus | undefined => {
  if (typeof raw === "number") return numberToStatus[raw];
  if (Object.values(OrderStatus).includes(raw as OrderStatus))
    return raw as OrderStatus;
  return undefined;
};

const STATUS_TEXT: Record<OrderStatus, string> = {
  [OrderStatus.Confirmed]: "Confirmed",
  [OrderStatus.PreProduction]: "Pre-Production",
  [OrderStatus.InProduction]: "In Production",
  [OrderStatus.Shipped]: "Shipped",
  [OrderStatus.OutForDelivery]: "Out For Delivery",
  [OrderStatus.Delivered]: "Delivered",
  [OrderStatus.Cancelled]: "Cancelled",
};

const STATUS_CLASS: Record<OrderStatus, string> = {
  [OrderStatus.Confirmed]: "bg-blue-100 text-blue-800",
  [OrderStatus.PreProduction]: "bg-purple-100 text-purple-800",
  [OrderStatus.InProduction]: "bg-purple-100 text-purple-800",
  [OrderStatus.Shipped]: "bg-amber-100 text-amber-800",
  [OrderStatus.OutForDelivery]: "bg-amber-100 text-amber-800",
  [OrderStatus.Delivered]: "bg-green-100 text-green-800",
  [OrderStatus.Cancelled]: "bg-red-100 text-red-800",
};

export const getOrderStatusText = (status: StatusInput): string =>
  STATUS_TEXT[toStatusEnum(status) as OrderStatus] ?? "Unknown";

export const getOrderStatusClass = (status: StatusInput): string =>
  STATUS_CLASS[toStatusEnum(status) as OrderStatus] ??
  "bg-gray-100 text-gray-800";

export const isActiveOrder = (status: StatusInput): boolean => {
  const normalised = toStatusEnum(status);
  return (
    normalised !== OrderStatus.Delivered && normalised !== OrderStatus.Cancelled
  );
};
