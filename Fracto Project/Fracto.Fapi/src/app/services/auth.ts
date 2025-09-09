// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';

export interface AuthResponse {
  token: string;
  userId: number;
  role: 'User' | 'Admin';
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role?: 'User' | 'Admin';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth$ = new BehaviorSubject<AuthResponse | null>(this.restoreAuth());
  auth$ = this._auth$.asObservable();

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  private restoreAuth(): AuthResponse | null {
    const raw = localStorage.getItem('fracto_auth');
    return raw ? JSON.parse(raw) : null;
  }

  getToken(): string {
    return this.tokenStorage.getToken() ?? '';
  }

  getRole(): 'User' | 'Admin' | '' {
    return (this.tokenStorage.getRole() as 'User' | 'Admin') ?? '';
  }

  getUserId(): number {
    return this._auth$.value?.userId ?? 0;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }
  isUser(): boolean {
    return this.getRole() === 'User';
  }

  /** Login */
  login(dto: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/User/login`, dto).pipe(
      tap(res => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveRole(res.role);

        localStorage.setItem('fracto_auth', JSON.stringify(res));

        this._auth$.next(res);
      })
    );
  }

  register(dto: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/User/register`, dto);
  }

  logout(): void {
    this.tokenStorage.signOut();
    this._auth$.next(null);
  }
}
