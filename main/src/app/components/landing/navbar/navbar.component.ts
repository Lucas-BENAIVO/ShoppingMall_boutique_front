import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from '../cart/shopping-cart/shopping-cart.component';
import { CartService } from '../../../services/cart.service';
import { AuthService, User } from '../../../services/auth.service';
import { BoutiqueService, Boutique } from '../../../services/boutique.service';
import { SearchService, SearchResults } from '../../../services/search.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ShoppingCartComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCartOpen = false;
  cartCount = 0;
  currentUser: User | null = null;
  isUserMenuOpen = false;
  isBoutiqueDropdownOpen = false;
  
  // Boutiques
  boutiques: Boutique[] = [];
  
  // Search
  searchQuery = '';
  searchResults: SearchResults = { products: [], boutiques: [] };
  isSearching = false;
  showSearchResults = false;
  private searchSubject = new Subject<string>();
  
  private subscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService, 
    private authService: AuthService,
    private boutiqueService: BoutiqueService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.cartService.cartCount$.subscribe(count => {
        this.cartCount = count;
      })
    );
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
      })
    );
    
    // Charger les boutiques
    this.loadBoutiques();
    
    // Configuration de la recherche avec debounce
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(query => {
        if (query.length >= 2) {
          this.performSearch(query);
        } else {
          this.searchResults = { products: [], boutiques: [] };
          this.showSearchResults = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadBoutiques(): void {
    this.boutiqueService.getValidatedBoutiques().subscribe({
      next: (response) => {
        if (response.success) {
          this.boutiques = response.data.slice(0, 6); // Max 6 boutiques dans le dropdown
        }
      },
      error: (err) => console.warn('Erreur chargement boutiques:', err)
    });
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  performSearch(query: string): void {
    this.isSearching = true;
    this.searchService.searchAll(query).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.showSearchResults = true;
        this.isSearching = false;
      },
      error: () => {
        this.isSearching = false;
        this.showSearchResults = false;
      }
    });
  }

  onSearchSubmit(): void {
    if (this.searchQuery.length >= 2) {
      this.showSearchResults = false;
      this.router.navigate(['/landing/produit'], { queryParams: { search: this.searchQuery } });
    }
  }

  selectProduct(productId: string): void {
    this.showSearchResults = false;
    this.searchQuery = '';
    this.router.navigate(['/landing/produit', productId]);
  }

  selectBoutique(boutiqueId: string): void {
    this.showSearchResults = false;
    this.isBoutiqueDropdownOpen = false;
    this.searchQuery = '';
    this.router.navigate(['/landing/boutique', boutiqueId]);
  }

  closeSearchResults(): void {
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }

  toggleBoutiqueDropdown(): void {
    this.isBoutiqueDropdownOpen = !this.isBoutiqueDropdownOpen;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.isUserMenuOpen = false;
  }
}
