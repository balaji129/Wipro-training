import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.css'],
  standalone: false
})
export class AppointmentList implements OnInit {
  appointments: Appointment[] = [];
  message = '';
  error = '';

  constructor(private apptSvc: AppointmentService, public auth: AuthService) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    if (userId && this.auth.isUser()) {
      this.apptSvc.getForUser(userId).subscribe({
        next: list => this.appointments = list,
        error: err => this.error = err?.error || 'Failed to load appointments'
      });
    }
  }

  cancel(appointmentId: number) {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    this.apptSvc.cancel(appointmentId).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(a => a.appointmentId !== appointmentId);
        this.message = 'Appointment cancelled successfully.';
      },
      error: err => this.error = err?.error || 'Failed to cancel appointment'
    });
  }
}
