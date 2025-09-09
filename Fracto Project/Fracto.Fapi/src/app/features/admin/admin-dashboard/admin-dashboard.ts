import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor';
import { AppointmentService } from '../../../services/appointment';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';
import { Doctor } from '../../../models/doctor';
import { Appointment } from '../../../models/appointment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,  
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  doctors: Doctor[] = [];
  appointments: Appointment[] = [];
  loading = false;

  constructor(
    private doctorSvc: DoctorService,
    private appointmentSvc: AppointmentService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.tokenStorage.isAdmin()) {
      alert('Access denied. Admins only.');
      this.router.navigate(['/']);
      return;
    }
    this.loadDoctors();
    this.loadAppointments();
  }

  loadDoctors(): void {
    this.doctorSvc.getDoctors().subscribe(d => this.doctors = d);
  }

  addDoctor(): void {
    this.router.navigate(['/admin/doctors/add']);
  }

  editDoctor(id: number): void {
    this.router.navigate(['/admin/doctors/edit', id]);
  }

  deleteDoctor(id: number): void {
    if (!confirm('Delete this doctor?')) return;
    this.doctorSvc.deleteDoctor(id).subscribe(() => this.loadDoctors());
  }

  loadAppointments(): void {
    this.appointmentSvc.getAll().subscribe(a => this.appointments = a);
  }

  updateAppointmentStatus(id: number, status: string): void {
    this.appointmentSvc.updateStatus(id, status).subscribe(() => this.loadAppointments());
  }

  deleteAppointment(id: number): void {
    if (!confirm('Delete this appointment?')) return;
    this.appointmentSvc.delete(id).subscribe(() => this.loadAppointments());
  }
}
