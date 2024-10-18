import { Injectable } from '@angular/core';
import { Shop } from '../shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  shopList: Shop[] = [];

  // Neuen Shop erstellen
  addShop(shop: Shop) {
    if (shop.name.trim()) {
      this.shopList.push(shop);
    }
  }

  // Shop aus Liste der Shops löschen
  deleteShop(index: number) {
    this.shopList.splice(index, 1);
  }
}