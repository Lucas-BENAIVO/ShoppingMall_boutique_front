import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss']
})
export class CategorySidebarComponent {
  // État d'expansion pour chaque section
  isCategoriesExpanded = true;
  isBrandsExpanded = true;
  isPriceExpanded = true;
  isSizeExpanded = true;

  categories = [
    { name: 'Femme', count: null, checked: false, subcategories: [
      { name: 'Hauts', count: 37, checked: true },
      { name: 'Vestes', count: 28, checked: false },
      { name: 'Pulls', count: 31, checked: false }
    ]},
    { name: 'Homme', count: null, checked: false },
    { name: 'Enfants', count: null, checked: false },
    { name: 'Sport', count: null, checked: false },
    { name: 'Décontracté', count: null, checked: false }
  ];

  brands = [
    { name: 'Nike', count: 45, checked: false },
    { name: 'Adidas', count: 38, checked: false },
    { name: 'Zara', count: 52, checked: false },
    { name: 'H&M', count: 41, checked: false }
  ];

  priceRanges = [
    { label: 'Moins de 20€', min: 0, max: 20, checked: false },
    { label: '20€ - 100€', min: 20, max: 100, checked: true },
    { label: '100€ - 200€', min: 100, max: 200, checked: false },
    { label: 'Plus de 200€', min: 200, max: 9999, checked: false }
  ];

  sizes = [
    { name: 'XS', checked: false },
    { name: 'S', checked: false },
    { name: 'M', checked: true },
    { name: 'L', checked: false },
    { name: 'XL', checked: false }
  ];

  // Méthodes de toggle pour l'expansion/collapse
  toggleCategories() {
    this.isCategoriesExpanded = !this.isCategoriesExpanded;
  }

  toggleBrands() {
    this.isBrandsExpanded = !this.isBrandsExpanded;
  }

  togglePrice() {
    this.isPriceExpanded = !this.isPriceExpanded;
  }

  toggleSizeSection() {
    this.isSizeExpanded = !this.isSizeExpanded;
  }

  // Méthodes pour gérer les sélections
  toggleCategory(category: any) {
    category.checked = !category.checked;
  }

  toggleSubcategory(subcategory: any) {
    subcategory.checked = !subcategory.checked;
  }

  toggleBrand(brand: any) {
    brand.checked = !brand.checked;
  }

  togglePriceRange(range: any) {
    range.checked = !range.checked;
  }

  toggleSize(size: any) {
    size.checked = !size.checked;
  }
}
