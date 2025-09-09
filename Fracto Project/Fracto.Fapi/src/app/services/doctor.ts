import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Doctor } from '../models/doctor';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/Doctor`;

  constructor(private http: HttpClient) {}

  getDoctors(filters?: { city?: string; specializationId?: number; minRating?: number }): Observable<Doctor[]> {
    let params = new HttpParams();
    if (filters?.city) params = params.set('city', filters.city);
    if (filters?.specializationId) params = params.set('specializationId', filters.specializationId.toString());
    if (filters?.minRating) params = params.set('minRating', filters.minRating.toString());

    return this.http.get<{ $values: Doctor[] }>(this.apiUrl, { params }).pipe(
      map(res => res.$values || [])
    );
  }

  /** GET a doctor by ID */
  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  createDoctor(dto: Partial<Doctor>): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, dto);
  }

  updateDoctor(id: number, dto: Partial<Doctor>): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, dto);
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  rateDoctor(id: number, rating: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/rate`, { rating });
  }
}
