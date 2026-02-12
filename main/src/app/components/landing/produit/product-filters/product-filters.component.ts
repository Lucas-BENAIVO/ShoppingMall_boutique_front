import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {
  totalResults = 6;
  totalAvailable = 37;
  searchTerm = 'tops';
  
  activeFilters = [
    { label: 'Tops', type: 'category' },
    { label: '$20 - $100', type: 'price' },
    { label: 'Medium', type: 'size' }
  ];

  sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' }
  ];

  selectedSort = 'popularity';

  removeFilter(index: number) {
    this.activeFilters.splice(index, 1);
  }
}
