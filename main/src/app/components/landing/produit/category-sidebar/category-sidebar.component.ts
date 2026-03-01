import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, Category } from '../../../../services/category.service';
import { FilterService } from '../../../../services/filter.service';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss']
})
export class CategorySidebarComponent implements OnInit {
  // État d'expansion pour chaque section
  isCategoriesExpanded = true;
  isBrandsExpanded = true;
  isPriceExpanded = true;
  isSizeExpanded = true;

  categories: any[] = [];
  selectedCategoryId: string | null = null;
  selectedPriceRange: any = null;

  // Catégories par défaut
  private defaultCategories = [
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
    { label: 'Moins de 50 000 Ar', min: 0, max: 50000, checked: false },
    { label: '50 000 - 200 000 Ar', min: 50000, max: 200000, checked: false },
    { label: '200 000 - 500 000 Ar', min: 200000, max: 500000, checked: false },
    { label: 'Plus de 500 000 Ar', min: 500000, max: undefined, checked: false }
  ];

  sizes = [
    { name: 'XS', checked: false },
    { name: 'S', checked: false },
    { name: 'M', checked: false },
    { name: 'L', checked: false },
    { name: 'XL', checked: false }
  ];

  constructor(
    private categoryService: CategoryService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          this.categories = response.data.map(cat => ({
            _id: cat._id,
            name: cat.name,
            count: null,
            checked: false,
            subcategories: []
          }));
        } else {
          this.categories = this.defaultCategories;
        }
      },
      error: (err) => {
        console.warn('Catégories non disponibles depuis le backend');
        this.categories = this.defaultCategories;
      }
    });
  }

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
    // Désélectionner les autres catégories
    this.categories.forEach(c => c.checked = false);
    
    if (this.selectedCategoryId === category._id) {
      // Désélectionner si déjà sélectionné
      this.selectedCategoryId = null;
      this.filterService.setCategory(undefined);
    } else {
      category.checked = true;
      this.selectedCategoryId = category._id;
      this.filterService.setCategory(category._id, category.name);
    }
  }

  toggleSubcategory(subcategory: any) {
    subcategory.checked = !subcategory.checked;
  }

  toggleBrand(brand: any) {
    brand.checked = !brand.checked;
  }

  togglePriceRange(range: any) {
    // Désélectionner les autres ranges
    this.priceRanges.forEach(r => r.checked = false);
    
    if (this.selectedPriceRange === range) {
      // Désélectionner si déjà sélectionné
      this.selectedPriceRange = null;
      this.filterService.setPriceRange(undefined, undefined);
    } else {
      range.checked = true;
      this.selectedPriceRange = range;
      this.filterService.setPriceRange(range.min, range.max);
    }
  }

  toggleSize(size: any) {
    size.checked = !size.checked;
  }

  clearAllFilters() {
    this.categories.forEach(c => c.checked = false);
    this.priceRanges.forEach(r => r.checked = false);
    this.brands.forEach(b => b.checked = false);
    this.sizes.forEach(s => s.checked = false);
    this.selectedCategoryId = null;
    this.selectedPriceRange = null;
    this.filterService.clearAllFilters();
  }
}
