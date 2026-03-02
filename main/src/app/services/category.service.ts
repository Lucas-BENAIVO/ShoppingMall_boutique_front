import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.apiUrl);
  }

  createCategory(category: Partial<Category>): Observable<any> {
    return this.http.post(this.apiUrl, category);
  }
}
