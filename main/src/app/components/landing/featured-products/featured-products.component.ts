import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FeaturedProductsComponent {
  products = [
    {
      image: 'assets/images/products/sofa1.jpg',
      name: 'Canapé velours olive',
      subtitle: 'Maison & Déco',
      price: 'À partir de 1 599 €'
    },
    {
      image: 'assets/images/products/tshirt.jpg',
      name: 'T-shirt tendance',
      subtitle: 'Mode & Vêtements',
      price: '19,99 €'
    },
    {
      image: 'assets/images/products/ip.jpg',
      name: 'Smartphone dernière génération',
      subtitle: 'Électronique',
      price: 'À partir de 499 €'
    },
    {
      image: 'assets/images/products/jouet.jpg',
      name: 'Voiture télécommandée',
      subtitle: 'Jouets & Enfants',
      price: '29,99 €'
    },
    {
      image: 'assets/images/products/parfum.jpg',
      name: 'Parfum de luxe',
      subtitle: 'Beauté & Parfums',
      price: '59,99 €'
    },
    {
      image: 'assets/images/products/basket.jpg',
      name: 'Baskets running',
      subtitle: 'Sport & Loisirs',
      price: 'À partir de 79,99 €'
    }
  ];
}
