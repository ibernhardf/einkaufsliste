import { Shop } from "./shop";
export interface Product {
  id?: number;
  name: string;
  amount: number;
  bought: boolean;
  annotation: string;
  shop_id?: number;
  shop?: {
    name?: string,
    color?: string
  };
}
