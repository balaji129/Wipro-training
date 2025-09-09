import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor';
import { Doctor } from '../../../models/doctor';

@Component({
  selector: 'app-doctor-list',
  standalone: false,
  templateUrl: './doctor-list.html',
  styleUrls: ['./doctor-list.css']
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  filters = {
    city: '',
    specializationId: undefined as number | undefined,
    minRating: undefined as number | undefined
  };
  specializations = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Dermatology' },
    { id: 3, name: 'Pediatrics' },
    { id: 4, name: 'Gynacologist' },
    { id: 5, name: 'Neurology' },
  ];

  constructor(private doctorSvc: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorSvc.getDoctors(this.filters).subscribe({
      next: res => this.doctors = res,
      error: err => console.error(err)
    });
  }

  clearFilters() {
    this.filters = { city: '', specializationId: undefined, minRating: undefined };
    this.loadDoctors();
  }
}
