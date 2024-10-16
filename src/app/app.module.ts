import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EinkaufslisteComponent } from './einkaufsliste/einkaufsliste.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddShopComponent } from './add-shop/add-shop.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ShopsComponent } from './shops/shops.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    EinkaufslisteComponent,
    AddProductComponent,
    AddShopComponent,
    ShopsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ColorPickerModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
