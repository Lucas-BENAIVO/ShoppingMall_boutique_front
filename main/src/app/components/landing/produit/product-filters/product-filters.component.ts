import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../../services/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit, OnDestroy {
  activeFilters: { label: string; type: string; value: any }[] = [];
  private subscription = new Subscription();

  sortOptions = [
    { value: '', label: 'Tri par défaut' },
    { value: 'price-low', label: 'Prix croissant' },
    { value: 'price-high', label: 'Prix décroissant' },
    { value: 'newest', label: 'Plus récents' }
  ];

  selectedSort = '';

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.filterService.activeFilters$.subscribe(filters => {
        this.activeFilters = filters;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeFilter(index: number) {
    this.filterService.removeActiveFilter(index);
  }

  onSortChange() {
    this.filterService.setSort(this.selectedSort || undefined);
  }

  clearAllFilters() {
    this.filterService.clearAllFilters();
    this.selectedSort = '';
  }
}
