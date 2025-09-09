import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Doctor } from '../models/doctor';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/Doctor`;

  constructor(private http: HttpClient) {}

  /**
   * Get a list of doctors with optional filters
   * @param filters city, specializationId, minRating
   */
  getDoctors(filters?: { city?: string; specializationId?: number; minRating?: number }): Observable<Doctor[]> {
    let params = new HttpParams();
    if (filters?.city) params = params.set('city', filters.city);
    if (filters?.specializationId) params = params.set('specializationId', filters.specializationId.toString());
    if (filters?.minRating) params = params.set('minRating', filters.minRating.toString());

    return this.http.get<{ $values: Doctor[] }>(this.apiUrl, { params }).pipe(
      map(res => res.$values || [])
    );
  }

  /**
   * Get doctor by ID
   * Uses query parameter for compatibility with backend
   */
getDoctorById(id: number): Observable<Doctor> {
  return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
}

  /**
   * Update doctor details
   */
  updateDoctor(id: number, dto: Partial<Doctor>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dto);
  }

  /**
   * Delete doctor
   */
  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Rate doctor
   */
  rateDoctor(id: number, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/rate`, { rating });
  }
}
