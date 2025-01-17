export interface OrderItem {
  cartItemId: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
}

export interface DeliveryAddress {
  address: string;
  detailAddress: string;
}

export interface OrderFormData {
  items: OrderItem[];
  customerInfo: CustomerInfo;
  deliveryAddress: DeliveryAddress;
  deliveryNotes: string;
  points: number;
}
