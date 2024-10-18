import { Component } from '@angular/core';
import { faStore, faShoppingCart, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  faStore = faStore;
  faShoppingCart = faShoppingCart;
  faCircleInfo = faCircleInfo;
}
