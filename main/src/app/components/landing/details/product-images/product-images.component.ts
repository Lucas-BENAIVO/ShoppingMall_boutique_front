import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../services/product.service';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnChanges {
  @Input() product: Product | null = null;
  
  mainImage: string = '';
  thumbnails: string[] = [];
  selectedIndex: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.initializeImages();
    }
  }

  private initializeImages(): void {
    if (this.product?.images && this.product.images.length > 0) {
      this.thumbnails = this.product.images;
      this.mainImage = this.thumbnails[0];
    } else if (this.product?.image) {
      this.thumbnails = [this.product.image];
      this.mainImage = this.product.image;
    } else {
      this.thumbnails = ['assets/images/products/default.jpg'];
      this.mainImage = this.thumbnails[0];
    }
    this.selectedIndex = 0;
  }

  selectImage(index: number) {
    this.selectedIndex = index;
    this.mainImage = this.thumbnails[index];
  }
}
