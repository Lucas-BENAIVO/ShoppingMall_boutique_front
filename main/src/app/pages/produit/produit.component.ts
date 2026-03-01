import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/landing/navbar/navbar.component';
import { FooterComponent } from '../../components/landing/footer/footer.component';
import { CategorySidebarComponent } from '../../components/landing/produit/category-sidebar/category-sidebar.component';
import { ProductFiltersComponent } from '../../components/landing/produit/product-filters/product-filters.component';
import { ProductListComponent } from '../../components/landing/produit/product-list/product-list.component';
import { ProductPaginationComponent } from '../../components/landing/produit/product-pagination/product-pagination.component';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CategorySidebarComponent,
    ProductFiltersComponent,
    ProductListComponent,
    ProductPaginationComponent
  ],
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent {}
