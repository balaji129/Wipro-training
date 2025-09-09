import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Appointment } from '../../../models/appointment';

@Component({
  selector: 'app-admin-edit-appointment.component',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class AdminEditAppointmentComponent implements OnInit {
  form: FormGroup;
  appointmentId!: number;

  constructor(
    private fb: FormBuilder,
    private appointmentSvc: AppointmentService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      doctorId: ['', Validators.required],
      userId: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.tokenStorage.isAdmin()) {
      alert('Access denied. Admins only.');
      this.router.navigate(['/']);
      return;
    }

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.appointmentId = +id;
      this.loadAppointment();
    }
  }

  loadAppointment(): void {
    this.appointmentSvc.getAll().subscribe(appointments => {
      const appointment = appointments.find(a => a.appointmentId === this.appointmentId);
      if (appointment) this.form.patchValue(appointment);
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.appointmentSvc.update(this.appointmentId, this.form.value).subscribe({
      next: () => {
        alert('Appointment updated');
        this.router.navigate(['/admin']);
      },
      error: () => alert('Update failed')
    });
  }

  delete(): void {
    if (!confirm('Delete this appointment?')) return;
    this.appointmentSvc.delete(this.appointmentId).subscribe(() => this.router.navigate(['/admin']));
  }
}
