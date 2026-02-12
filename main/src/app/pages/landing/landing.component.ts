import { Component } from '@angular/core';
import { CarouselComponent } from 'src/app/components/landing/carousel/carousel.component';
import { NavbarComponent } from 'src/app/components/landing/navbar/navbar.component';
import { FeaturedProductsComponent } from 'src/app/components/landing/featured-products/featured-products.component';
import { FurnishCornerComponent } from 'src/app/components/landing/furnish-corner/furnish-corner.component';
import { FooterComponent } from 'src/app/components/landing/footer/footer.component';
import { TrendingProductsComponent } from 'src/app/components/landing/trending-products/trending-products.component';

@Component({
  selector: 'app-landing',
  imports: [
    CarouselComponent,
    NavbarComponent,
    FeaturedProductsComponent,
    TrendingProductsComponent,
    FurnishCornerComponent,
    FooterComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {}
