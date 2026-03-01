import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  categoryId?: string;
  boutiqueId?: string;
  images?: string[];
  image?: string;
  stock?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export interface SingleProductResponse {
  success: boolean;
  data: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl);
  }

  getProductById(productId: string): Observable<SingleProductResponse> {
    return this.http.get<SingleProductResponse>(`${this.apiUrl}/${productId}`);
  }

  getProductsByCategory(categoryId: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/category/${categoryId}`);
  }

  getProductsByBoutique(boutiqueId: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/boutique/${boutiqueId}`);
  }

  searchProducts(name: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/search`, {
      params: { name }
    });
  }

  filterProducts(filters: {
    categoryId?: string;
    boutiqueId?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
  }): Observable<ProductResponse> {
    const params: any = {};
    if (filters.categoryId) params.categoryId = filters.categoryId;
    if (filters.boutiqueId) params.boutiqueId = filters.boutiqueId;
    if (filters.minPrice !== undefined) params.minPrice = filters.minPrice.toString();
    if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice.toString();
    if (filters.search) params.search = filters.search;
    if (filters.sort) params.sort = filters.sort;
    
    return this.http.get<ProductResponse>(`${this.apiUrl}/filter`, { params });
  }

  createProduct(product: Partial<Product>): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
}
