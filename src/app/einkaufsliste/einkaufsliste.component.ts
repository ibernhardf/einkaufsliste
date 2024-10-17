import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SupabaseService } from '../services/supabase.service';
import { faShoppingCart, faStore, faCheck, faUndo, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-einkaufsliste',
  templateUrl: './einkaufsliste.component.html',
  styleUrls: ['./einkaufsliste.component.css']
})
export class EinkaufslisteComponent implements OnInit {

  constructor(protected productService: ProductService, private supabaseService: SupabaseService) {}

  faShoppingCart = faShoppingCart;
  faStore = faStore;
  faCheck = faCheck;
  faUndo = faUndo;
  faTrash = faTrash;

  ngOnInit(): void {
    this.getProductList();
  }

  async getProductList() {
    this.productService.productList = await this.supabaseService.getProductList();
    console.log("productService.productList: ", this.productService.productList);
  }

  async boughtProduct(index: number) {
    const product = this.productService.productList[index];
    const data = await this.supabaseService.boughtProduct(product.id!, !product.bought);
    this.productService.boughtProduct(index);
  }

  async removeProduct(index: number) {
    const product = this.productService.productList[index];
    await this.supabaseService.removeProduct(product.id!);
    this.productService.removeProduct(index);
  }

}
