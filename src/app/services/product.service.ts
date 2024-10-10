import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  id: number = 0;
  name: string = '';
  amount: number = 1;
  bought: boolean = false;
  annotation: string = ''

  product: Product = {
    id: this.id,
    name: this.name,
    amount: this.amount,
    bought: this.bought,
    annotation: this.annotation
  };
  productList: Product[] = [];

  // Artikel zur Liste hinzufügen
  addProduct(): Product {
    if (this.name.trim()) {

      this.product = {
        name: this.name,
        amount: this.amount,
        bought: false,
        annotation: this.annotation
      };

      this.productList.push(
        this.product
      );

      // Werte zurücksetzen
      this.name = '';
      this.amount = 1;
      this.bought = false;
      this.annotation = '';
    }
    return this.product;
  }

  // Artikel als gekauft markieren
  boughtProduct(index: number) {
    this.productList[index].bought = !this.productList[index].bought;
  }

  // Artikel aus der Liste entfernen
  removeProduct(index: number) {
    this.productList.splice(index, 1);
  }
}