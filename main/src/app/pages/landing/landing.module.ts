import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { NavbarComponent } from '../../components/landing/navbar/navbar.component';
import { CarouselComponent } from '../../components/landing/carousel/carousel.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, NavbarComponent, CarouselComponent],
  exports: [LandingComponent]
})
export class LandingModule {}
