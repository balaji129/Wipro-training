// src/app/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment, AppointmentCreateDto } from '../models/appointment';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/Appointment`;

  constructor(private http: HttpClient) {}

  book(dto: AppointmentCreateDto): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, dto);
  }

  getForUser(userId: number): Observable<Appointment[]> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`).pipe(
      map(res => {
        if (res && Array.isArray(res.$values)) return res.$values as Appointment[];
        if (Array.isArray(res)) return res as Appointment[];
        if (res && Array.isArray(res.appointments)) return res.appointments as Appointment[];
        return [];
      })
    );
  }

  getAll(): Observable<Appointment[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        if (res && Array.isArray(res.$values)) return res.$values as Appointment[];
        if (Array.isArray(res)) return res as Appointment[];
        if (res && Array.isArray(res.appointments)) return res.appointments as Appointment[];
        return [];
      })
    );
  }

  update(appointmentId: number, dto: Partial<Appointment>): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${appointmentId}`, dto);
  }

  updateStatus(appointmentId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${appointmentId}/status`, { status });
  }

  delete(appointmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${appointmentId}`);
  }
}
