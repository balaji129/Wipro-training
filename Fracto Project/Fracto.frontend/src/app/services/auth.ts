import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
  userId: number;
  role: 'User' | 'Admin';
  username: string;
}

export interface LoginRequest { username: string; password: string; }
export interface RegisterRequest { username: string; password: string; role?: 'User' | 'Admin'; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth$ = new BehaviorSubject<AuthResponse | null>(this.restoreAuth());
  auth$ = this._auth$.asObservable();

  constructor(private http: HttpClient) {}

  /** Restore auth state from localStorage */
  private restoreAuth(): AuthResponse | null {
    const raw = localStorage.getItem('fracto_auth');
    return raw ? JSON.parse(raw) : null;
  }

  /** Get token string */
  getToken(): string {
    return this._auth$.value?.token ?? '';
  }

  /** Get user role */
  getRole(): 'User' | 'Admin' | '' {
    return this._auth$.value?.role ?? '';
  }

  /** Get userId */
  getUserId(): number {
    return this._auth$.value?.userId ?? 0;
  }

  /** Check if logged in */
  isAuthenticated(): boolean {
    return !!this._auth$.value?.token;
  }

  /** Role helpers */
  isAdmin(): boolean { return this.getRole() === 'Admin'; }
  isUser(): boolean { return this.getRole() === 'User'; }

  /** Login */
  login(dto: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/User/login`, dto)
      .pipe(
        tap(res => {
          localStorage.setItem('fracto_token', res.token);
          localStorage.setItem('fracto_auth', JSON.stringify(res));
          this._auth$.next(res);
        })
      );
  }

  /** Register */
  register(dto: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/User/register`, dto);
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem('fracto_token');
    localStorage.removeItem('fracto_auth');
    this._auth$.next(null);
  }
}
