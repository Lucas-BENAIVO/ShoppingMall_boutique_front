import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent {
  products: any[] = [
    {
      id: 1,
      name: 'T-shirt Homme',
      color: 'Blanc / Noir',
      price: 39.00,
      image: ''
    },
    {
      id: 2,
      name: 'Baskets Urban',
      color: 'Noir / Blanc',
      price: 60.00,
      image: ''
    },
    {
      id: 3,
      name: 'Jogging Pure',
      color: 'Blanc',
      price: 45.00,
      image: ''
    },
    {
      id: 4,
      name: 'T-shirt Contraste',
      color: 'Noir/Blanc',
      price: 39.00,
      image: ''
    }
  ];
}
