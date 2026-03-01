import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ProductFilters {
  categoryId?: string;
  boutiqueId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<ProductFilters>({});
  filters$ = this.filtersSubject.asObservable();

  private activeFiltersSubject = new BehaviorSubject<{ label: string; type: string; value: any }[]>([]);
  activeFilters$ = this.activeFiltersSubject.asObservable();

  getCurrentFilters(): ProductFilters {
    return this.filtersSubject.getValue();
  }

  updateFilters(newFilters: Partial<ProductFilters>): void {
    const currentFilters = this.filtersSubject.getValue();
    const updatedFilters = { ...currentFilters, ...newFilters };
    
    // Nettoyer les valeurs undefined/null
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key as keyof ProductFilters] === undefined || 
          updatedFilters[key as keyof ProductFilters] === null ||
          updatedFilters[key as keyof ProductFilters] === '') {
        delete updatedFilters[key as keyof ProductFilters];
      }
    });
    
    this.filtersSubject.next(updatedFilters);
    this.updateActiveFilters(updatedFilters);
  }

  setCategory(categoryId: string | undefined, categoryName?: string): void {
    this.updateFilters({ categoryId });
  }

  setPriceRange(minPrice?: number, maxPrice?: number): void {
    this.updateFilters({ minPrice, maxPrice });
  }

  setSearch(search: string | undefined): void {
    this.updateFilters({ search });
  }

  setSort(sort: string | undefined): void {
    this.updateFilters({ sort });
  }

  setBoutique(boutiqueId: string | undefined): void {
    this.updateFilters({ boutiqueId });
  }

  clearFilter(type: keyof ProductFilters): void {
    const updates: Partial<ProductFilters> = {};
    updates[type] = undefined;
    this.updateFilters(updates);
  }

  clearAllFilters(): void {
    this.filtersSubject.next({});
    this.activeFiltersSubject.next([]);
  }

  private updateActiveFilters(filters: ProductFilters): void {
    const active: { label: string; type: string; value: any }[] = [];
    
    if (filters.categoryId) {
      active.push({ label: 'Catégorie sélectionnée', type: 'categoryId', value: filters.categoryId });
    }
    
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const min = filters.minPrice ?? 0;
      const max = filters.maxPrice ?? '∞';
      active.push({ label: `${min} - ${max} Ar`, type: 'price', value: { min: filters.minPrice, max: filters.maxPrice } });
    }
    
    if (filters.search) {
      active.push({ label: `"${filters.search}"`, type: 'search', value: filters.search });
    }
    
    if (filters.boutiqueId) {
      active.push({ label: 'Boutique sélectionnée', type: 'boutiqueId', value: filters.boutiqueId });
    }
    
    this.activeFiltersSubject.next(active);
  }

  removeActiveFilter(index: number): void {
    const activeFilters = this.activeFiltersSubject.getValue();
    const filterToRemove = activeFilters[index];
    
    if (filterToRemove) {
      if (filterToRemove.type === 'price') {
        this.clearFilter('minPrice');
        this.clearFilter('maxPrice');
      } else {
        this.clearFilter(filterToRemove.type as keyof ProductFilters);
      }
    }
  }
}
