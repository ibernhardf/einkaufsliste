import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SupabaseService } from '../services/supabase.service';
import { Product } from '../product';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ShopService } from '../services/shop.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    protected productService: ProductService,
    protected shopService: ShopService,
    private supabaseService: SupabaseService,
  ) {}

  ngOnInit(): void {
    this.getShopList();
  }

  async getShopList() {
    this.shopService.shopList = await this.supabaseService.getShopList();
  }

  faPlusCircle = faPlusCircle;

  product: Product = {
    name: '',
    amount: 1,
    bought: false,
    annotation: ''
  };

  async addProduct() {

    if (!this.product.name.trim()) {
      return;
    }

    // Übergabe ans ProductService, um den Artikel hinzuzufügen.
    this.productService.addProduct(this.product);

    // Produkt zur Datenbank hinzufügen.
    await this.supabaseService.addProduct(this.product);

    this.resetForm();
  }

  resetForm() {
    this.product = {
      name: '',
      amount: 1,
      bought: false,
      annotation: ''
    };
  }
}
