import { Component, Input, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../../services/product.service';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnChanges {
  @Input() currentProductId: string = '';
  @Input() categoryId?: string;

  products: any[] = [];
  isLoading = true;

  private defaultProducts: any[] = [
    { id: '1', name: 'T-shirt Homme', color: 'Blanc / Noir', price: 39.00, image: '' },
    { id: '2', name: 'Baskets Urban', color: 'Noir / Blanc', price: 60.00, image: '' },
    { id: '3', name: 'Jogging Pure', color: 'Blanc', price: 45.00, image: '' },
    { id: '4', name: 'T-shirt Contraste', color: 'Noir/Blanc', price: 39.00, image: '' }
  ];

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId'] || changes['currentProductId']) {
      this.loadRelatedProducts();
    }
  }

  loadRelatedProducts(): void {
    this.isLoading = true;

    // Si on a un categoryId, chercher les produits de la même catégorie
    if (this.categoryId) {
      this.productService.getProductsByCategory(this.categoryId).subscribe({
        next: (response) => {
          if (response.success && response.data.length > 0) {
            // Exclure le produit actuel et limiter à 4 produits
            this.products = response.data
              .filter(p => p._id !== this.currentProductId)
              .slice(0, 4)
              .map(p => ({
                _id: p._id,
                name: p.name,
                color: '',
                price: p.price,
                image: p.images?.[0] || p.image || ''
              }));
          }
          if (this.products.length === 0) {
            this.loadAllProducts();
          } else {
            this.isLoading = false;
          }
        },
        error: () => {
          this.loadAllProducts();
        }
      });
    } else {
      this.loadAllProducts();
    }
  }

  private loadAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success && response.data.length > 0) {
          this.products = response.data
            .filter(p => p._id !== this.currentProductId)
            .slice(0, 4)
            .map(p => ({
              _id: p._id,
              name: p.name,
              color: '',
              price: p.price,
              image: p.images?.[0] || p.image || ''
            }));
        } else {
          this.products = this.defaultProducts;
        }
        this.isLoading = false;
      },
      error: () => {
        this.products = this.defaultProducts;
        this.isLoading = false;
      }
    });
  }
}
