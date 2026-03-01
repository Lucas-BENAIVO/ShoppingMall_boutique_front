import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Boutique {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  ownerId?: string;
  isValidated?: boolean;
  isSuspended?: boolean;
  address?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BoutiqueResponse {
  success: boolean;
  count?: number;
  data: Boutique[];
}

export interface SingleBoutiqueResponse {
  success: boolean;
  data: Boutique;
}

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private readonly apiUrl = `${environment.apiNodeUrl}/api/mall/boutiques`;

  constructor(private http: HttpClient) {}

  getAllBoutiques(): Observable<BoutiqueResponse> {
    return this.http.get<BoutiqueResponse>(this.apiUrl);
  }

  getValidatedBoutiques(): Observable<BoutiqueResponse> {
    return this.http.get<BoutiqueResponse>(`${this.apiUrl}/validated`);
  }

  getBoutiqueById(id: string): Observable<SingleBoutiqueResponse> {
    return this.http.get<SingleBoutiqueResponse>(`${this.apiUrl}/${id}`);
  }

  searchBoutiques(query: string): Observable<BoutiqueResponse> {
    return this.http.get<BoutiqueResponse>(`${this.apiUrl}/search`, {
      params: { name: query }
    });
  }

  createBoutique(boutique: Partial<Boutique>): Observable<any> {
    return this.http.post(this.apiUrl, boutique);
  }
}
