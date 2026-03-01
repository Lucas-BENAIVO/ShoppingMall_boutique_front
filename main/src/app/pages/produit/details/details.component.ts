import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../components/landing/navbar/navbar.component';
import { FooterComponent } from '../../../components/landing/footer/footer.component';
import { ProductImagesComponent } from '../../../components/landing/details/product-images/product-images.component';
import { ProductInfoComponent } from '../../../components/landing/details/product-info/product-info.component';
import { RelatedProductsComponent } from '../../../components/landing/details/related-products/related-products.component';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ProductImagesComponent,
    ProductInfoComponent,
    RelatedProductsComponent
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  loadProduct(productId: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.product = response.data;
        } else {
          this.errorMessage = 'Produit non trouvé';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement du produit';
        this.isLoading = false;
        console.error('Erreur:', err);
      }
    });
  }
}
