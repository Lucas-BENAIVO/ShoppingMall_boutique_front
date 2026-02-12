import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products = [
    { title: 'Autumn Dress', price: 85, originalPrice: 124, colors: 2, onSale: true, image: '' },
    { title: 'Casual Shirt', price: 29, originalPrice: 35, colors: 7, onSale: true, image: '' },
    { title: 'Leather Coat', price: 35, colors: 7, onSale: false, image: '' },
    { title: 'Vneck Shirt', price: 230, colors: 5, onSale: false, image: '' },
    { title: 'Long Coat Outer', price: 12, colors: 7, onSale: false, image: '' },
    { title: 'Denim Jacket', price: 32, colors: 5, onSale: false, image: '' }
  ];
}
