import { Shop } from "./shop";
export interface Product {
  id?: any;
  name: any;
  amount: any;
  bought: any;
  annotation: any;
  shop_id?: any;
  shop?: {
    name?: any,
    color?: any
  };
}
