import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { SupabaseService } from '../services/supabase.service';
import { faStore, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  constructor(
    protected shopService: ShopService,
    private supabaseService: SupabaseService
  ) {}

  faShoppingCart = faShoppingCart;
  faStore = faStore;
  faTrash = faTrash;

  ngOnInit(): void {
    this.getShopList();
  }

  async getShopList() {
    this.shopService.shopList = await this.supabaseService.getShopList();
  }

  async deleteShop(index: number) {
    const shop = this.shopService.shopList[index];
    await this.supabaseService.deleteShop(shop.id!);
    this.shopService.deleteShop(index);
  }

}
