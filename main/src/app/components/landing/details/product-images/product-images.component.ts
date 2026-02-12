import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent {
  mainImage: string = '';
  thumbnails: string[] = ['', '', ''];
  selectedIndex: number = 0;

  selectImage(index: number) {
    this.selectedIndex = index;
    this.mainImage = this.thumbnails[index];
  }
}
