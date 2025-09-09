// features/admin/admin-dashboard/admin-dashboard.ts
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor';
import { AppointmentService } from '../../../services/appointment';
import { AuthService } from '../../../services/auth';
import { Doctor } from '../../../models/doctor';
import { Appointment } from '../../../models/appointment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  doctors: Doctor[] = [];
  appointments: Appointment[] = [];
  loadingDoctors = false;
  loadingAppointments = false;

  constructor(
    private doctorSvc: DoctorService,
    private apptSvc: AppointmentService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/']); // redirect non-admins
      return;
    }
    this.loadDoctors();
    this.loadAppointments();
  }

  loadDoctors(): void {
    this.loadingDoctors = true;
    this.doctorSvc.getDoctors().subscribe({
      next: (list) => {
        // Ensure doctorId is defined
        this.doctors = list.filter(d => d.doctorId !== undefined);
        this.loadingDoctors = false;
      },
      error: () => { this.loadingDoctors = false; }
    });
  }

  loadAppointments(): void {
    this.loadingAppointments = true;
    this.apptSvc.getAll().subscribe({
      next: (list) => {
        // Ensure appointmentId is defined
        this.appointments = list.filter(a => a.appointmentId !== undefined).map(a => ({ ...a, status: a.status ?? 'Pending' }));
        this.loadingAppointments = false;
      },
      error: () => { this.loadingAppointments = false; }
    });
  }

  // Doctor CRUD operations
  editDoctor(id: number): void {
    if (!id) return;
    this.router.navigate(['/admin/doctors/edit', id]);
  }

  deleteDoctor(id: number): void {
    if (!id || !confirm('Are you sure you want to delete this doctor?')) return;
    // Call service to delete doctor (implement in DoctorService)
    console.log('Delete doctor', id);
    this.doctors = this.doctors.filter(d => d.doctorId !== id);
  }

  // Appointment CRUD
  updateAppointmentStatus(id: number, status: string): void {
    if (!id || !status) return;
    this.apptSvc.updateStatus(id, status).subscribe(() => {
      const appt = this.appointments.find(a => a.appointmentId === id);
      if (appt) appt.status = status;
    });
  }

  deleteAppointment(id: number): void {
    if (!id || !confirm('Are you sure you want to delete this appointment?')) return;
    this.apptSvc.cancel(id).subscribe(() => {
      this.appointments = this.appointments.filter(a => a.appointmentId !== id);
    });
  }
}
