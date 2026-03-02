import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL = 'https://m1p13mean-henintsoa-lucas.onrender.com/api/mall/auth'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response?.accessToken && response?.refreshToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        })
      );
  }

  register(data: { fullName: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, { ...data, role: data.role || 'ACHETEUR' });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<any>(`${this.API_URL}/refresh`, {
      refreshToken: refreshToken
    }).pipe(
      tap(response => {
        if (response?.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
        }
      })
    );
  }

  logout(): void {
    localStorage.clear();
  }


  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}