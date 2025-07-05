import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  registrar(data: any) {
    return this.http.post(`${this.baseUrl}/registrar`, data);
  }

  login(data: any) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  recuperarContrasena(data: any) {
    return this.http.post(`${this.baseUrl}/recuperar-contrasena`, data);
  }
}
