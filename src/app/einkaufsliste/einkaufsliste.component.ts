import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-einkaufsliste',
  templateUrl: './einkaufsliste.component.html',
  styleUrls: ['./einkaufsliste.component.css']
})
export class EinkaufslisteComponent implements OnInit {

  constructor(protected productService: ProductService, private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  async getProductList() {
    this.productService.productList = await this.supabaseService.getProductList();
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
