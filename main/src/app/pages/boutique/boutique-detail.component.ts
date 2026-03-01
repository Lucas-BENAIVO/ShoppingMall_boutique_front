import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../components/landing/navbar/navbar.component';
import { FooterComponent } from '../../components/landing/footer/footer.component';
import { BoutiqueService, Boutique } from '../../services/boutique.service';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-boutique-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './boutique-detail.component.html',
  styleUrls: ['./boutique-detail.component.scss']
})
export class BoutiqueDetailComponent implements OnInit {
  boutique: Boutique | null = null;
  products: Product[] = [];
  isLoading = true;
  isLoadingProducts = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadBoutique(id);
        this.loadProducts(id);
      }
    });
  }

  loadBoutique(id: string): void {
    this.isLoading = true;
    this.boutiqueService.getBoutiqueById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.boutique = response.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Boutique introuvable';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadProducts(boutiqueId: string): void {
    this.isLoadingProducts = true;
    this.productService.getProductsByBoutique(boutiqueId).subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.data;
        }
        this.isLoadingProducts = false;
      },
      error: (err) => {
        console.error('Error loading boutique products', err);
        this.isLoadingProducts = false;
      }
    });
  }
}
