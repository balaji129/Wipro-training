import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, LoginRequest, AuthResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = 'http://localhost:5074/api/Appointment';

  constructor(private http: HttpClient) {}

  register(dto: RegisterRequest) {
    return this.http.post(`${environment.apiUrl}/User/register`, dto);
  }

  login(dto: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/User/login`, dto);
  }

  // optional: GET /api/User to list all users (backend has it)
  getAll() {
    return this.http.get(`${environment.apiUrl}/User`);
  }
}
