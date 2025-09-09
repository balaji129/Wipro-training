import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Specialization } from '../models/specialization';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SpecializationService {
  private apiUrl = `${environment.apiUrl}/Specialization`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Specialization[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => Array.isArray(res?.$values) ? res.$values : (Array.isArray(res) ? res : []))
    );
  }
}
