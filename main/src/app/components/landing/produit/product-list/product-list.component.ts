import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService, Product } from '../../../../services/product.service';
import { FilterService, ProductFilters } from '../../../../services/filter.service';
import { Subscription } from 'rxjs';

interface DisplayProduct {
  id?: string;
  title: string;
  price: number;
  originalPrice?: number;
  colors: number;
  onSale: boolean;
  image: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: DisplayProduct[] = [];
  isLoading = true;
  private subscription = new Subscription();

  private defaultProducts: DisplayProduct[] = [
    { title: 'Autumn Dress', price: 85000, originalPrice: 124000, colors: 2, onSale: true, image: '' },
    { title: 'Casual Shirt', price: 29000, originalPrice: 35000, colors: 7, onSale: true, image: '' },
    { title: 'Leather Coat', price: 350000, colors: 7, onSale: false, image: '' },
    { title: 'Vneck Shirt', price: 230000, colors: 5, onSale: false, image: '' },
    { title: 'Long Coat Outer', price: 120000, colors: 7, onSale: false, image: '' },
    { title: 'Denim Jacket', price: 320000, colors: 5, onSale: false, image: '' }
  ];

  constructor(
    private productService: ProductService,
    private filterService: FilterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Écouter les query params (pour la recherche depuis navbar)
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        if (params['search']) {
          this.filterService.setSearch(params['search']);
        }
        if (params['sort']) {
          this.filterService.setSort(params['sort']);
        }
      })
    );

    // Écouter les changements de filtres
    this.subscription.add(
      this.filterService.filters$.subscribe(filters => {
        this.loadProducts(filters);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProducts(filters: ProductFilters = {}): void {
    this.isLoading = true;
    
    // Si aucun filtre, charger tous les produits
    const hasFilters = Object.keys(filters).length > 0;
    
    const request = hasFilters 
      ? this.productService.filterProducts(filters)
      : this.productService.getAllProducts();
    
    request.subscribe({
      next: (response) => {
        if (response.success && response.data.length > 0) {
          this.products = response.data.map(product => ({
            id: product._id,
            title: product.name,
            price: product.price,
            originalPrice: undefined,
            colors: 1,
            onSale: false,
            image: product.images?.[0] || product.image || ''
          }));
        } else {
          this.products = hasFilters ? [] : this.defaultProducts;
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
}
