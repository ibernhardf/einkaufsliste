import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EinkaufslisteComponent } from './einkaufsliste/einkaufsliste.component';
import { ShopsComponent } from './shops/shops.component';


const routes: Routes = [
  { path: '', component: EinkaufslisteComponent },
  { path: 'list', component: EinkaufslisteComponent },
  { path: 'shops', component: ShopsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
