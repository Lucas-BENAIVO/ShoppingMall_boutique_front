import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../components/landing/navbar/navbar.component';
import { FooterComponent } from '../../../components/landing/footer/footer.component';
import { ProductImagesComponent } from '../../../components/landing/details/product-images/product-images.component';
import { ProductInfoComponent } from '../../../components/landing/details/product-info/product-info.component';
import { RelatedProductsComponent } from '../../../components/landing/details/related-products/related-products.component';

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
export class DetailsComponent {}
