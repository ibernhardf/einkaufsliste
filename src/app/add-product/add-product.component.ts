import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SupabaseService } from '../services/supabase.service';
import { Product } from '../product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(protected productService: ProductService, private supabaseService: SupabaseService) {}

  product: Product = {
    name: '',
    amount: 0,
    bought: false,
    annotation: ''
  };

  async addProduct() {

    console.log('AddProductComponent: addProduct');

    this.product = this.productService.addProduct();

    const data = await this.supabaseService.addProduct(
      this.product.name,
      this.product.amount,
      this.product.annotation
    );
  }
}
