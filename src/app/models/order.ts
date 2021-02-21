export interface Order {
  orderDate: Date;
  user: string;
  products: string[];
  paymentMethod: string;
  userInfo;
}
