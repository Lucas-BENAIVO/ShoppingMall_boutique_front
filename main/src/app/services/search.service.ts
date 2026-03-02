import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';
import { ProductResponse } from './product.service';
import { BoutiqueResponse } from './boutique.service';

export interface SearchResults {
  products: any[];
  boutiques: any[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall`;

  constructor(private http: HttpClient) {}

  searchAll(query: string): Observable<SearchResults> {
    const productSearch = this.http.get<ProductResponse>(`${this.apiUrl}/products/search`, {
      params: { name: query }
    });
    
    const boutiqueSearch = this.http.get<BoutiqueResponse>(`${this.apiUrl}/boutiques/search`, {
      params: { name: query }
    });

    return forkJoin([productSearch, boutiqueSearch]).pipe(
      map(([productsRes, boutiquesRes]) => ({
        products: productsRes.success ? productsRes.data : [],
        boutiques: boutiquesRes.success ? boutiquesRes.data : []
      }))
    );
  }

  searchProducts(query: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products/search`, {
      params: { name: query }
    });
  }

  searchBoutiques(query: string): Observable<BoutiqueResponse> {
    return this.http.get<BoutiqueResponse>(`${this.apiUrl}/boutiques/search`, {
      params: { name: query }
    });
  }
}
