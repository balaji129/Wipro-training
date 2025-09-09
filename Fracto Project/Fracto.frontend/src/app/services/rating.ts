// services/rating.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating, RatingCreateDto } from '../models/rating';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RatingService {
  constructor(private http: HttpClient) {}

  rate(dto: RatingCreateDto) { return this.http.post(`${environment.apiUrl}/Rating`, dto); }
  byDoctor(doctorId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${environment.apiUrl}/Rating/doctor/${doctorId}`);
  }
}
