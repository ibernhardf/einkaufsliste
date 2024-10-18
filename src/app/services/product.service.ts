import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  productList: Product[] = [];

  addProduct(product: Product) {

    if (product.name.trim()) {
      product.bought = false;
      this.productList.push(product);
    }
  }

  // Produkt als gekauft markieren
  boughtProduct(index: number) {
    this.productList[index].bought = !this.productList[index].bought;
  }

  // Produkt aus der Liste entfernen
  removeProduct(index: number) {
    this.productList.splice(index, 1);
  }
}