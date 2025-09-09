import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment, AppointmentCreateDto } from '../models/appointment';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private baseUrl = `${environment.apiUrl}/Appointment`;

  constructor(private http: HttpClient) {}

  /** Book a new appointment */
  book(dto: AppointmentCreateDto): Observable<Appointment> {
    return this.http.post<Appointment>(this.baseUrl, dto);
  }

  /** Get appointments for a specific user */
  getForUser(userId: number): Observable<Appointment[]> {
    return this.http.get<any>(`${this.baseUrl}/user/${userId}`).pipe(
      map(res => {
        if (res && Array.isArray(res.$values)) return res.$values as Appointment[];
        if (Array.isArray(res)) return res as Appointment[];
        if (res && Array.isArray(res.appointments)) return res.appointments as Appointment[];
        return [];
      })
    );
  }

  /** Get all appointments (admin) */
  getAll(): Observable<Appointment[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(res => {
        if (res && Array.isArray(res.$values)) return res.$values as Appointment[];
        if (Array.isArray(res)) return res as Appointment[];
        if (res && Array.isArray(res.appointments)) return res.appointments as Appointment[];
        return [];
      })
    );
  }

  /** Cancel an appointment */
  cancel(appointmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${appointmentId}`);
  }

  /** Update appointment status */
  updateStatus(appointmentId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${appointmentId}/status`, { status });
  }
}
