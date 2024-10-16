import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { SupabaseService } from '../services/supabase.service';
import { Shop } from '../shop';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent {

  constructor(
    protected shopService: ShopService,
    private supabaseService: SupabaseService,
  ) {}

  shop: Shop = {
    name: '',
    color: '#3355BB'
  };

  faPlusCircle = faPlusCircle;

  async addShop() {

    console.log('AddShopComponent: addShop');

    this.shopService.addShop(this.shop);

    await this.supabaseService.addShop(this.shop);

    this.resetForm();
  }

  resetForm() {
    this.shop = {
      name: '',
      color: '#3355BB'
    };
  }
}
