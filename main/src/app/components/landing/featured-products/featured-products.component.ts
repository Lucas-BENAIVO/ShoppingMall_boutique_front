import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';

interface DisplayProduct {
  image: string;
  name: string;
  subtitle: string;
  price: string;
  _id?: string;
}

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FeaturedProductsComponent implements OnInit {
  products: DisplayProduct[] = [];
  isLoading = true;

  // Données par défaut en cas d'absence de backend
  private defaultProducts: DisplayProduct[] = [
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success && response.data.length > 0) {
          this.products = response.data.slice(0, 6).map(product => ({
            _id: product._id,
            image: product.images?.[0] || product.image || 'assets/images/products/default.jpg',
            name: product.name,
            subtitle: product.category || 'Produit',
            price: this.formatPrice(product.price)
          }));
        } else {
          this.products = this.defaultProducts;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.warn('Backend non disponible, utilisation des données par défaut');
        this.products = this.defaultProducts;
        this.isLoading = false;
      }
    });
  }

  private formatPrice(price: number): string {
    return price ? `${price.toFixed(2)} €` : 'Prix non disponible';
  }
}
