import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor';
import { AppointmentService } from '../../../services/appointment';
import { AuthService } from '../../../services/auth';
import { Doctor } from '../../../models/doctor';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-detail',
  standalone: false,
  templateUrl: './doctor-detail.html',
  styleUrls: ['./doctor-detail.css']
})
export class DoctorDetailComponent implements OnInit {
  doctor?: Doctor;
  doctorId!: number;

  date: string = '';
  timeSlot: string = '';
  bookMsg: string = '';
  ratingValue: number = 0;
  rateMsg: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private doctorSvc: DoctorService,
    private appointmentSvc: AppointmentService
  ) {}

  ngOnInit(): void {
    // Automatically fetch doctor whenever route param changes
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          if (!id) throw new Error('Invalid doctor ID');
          this.doctorId = id;
          this.bookMsg = '';
          this.rateMsg = '';
          this.date = '';
          this.timeSlot = '';
          this.ratingValue = 0;
          return this.doctorSvc.getDoctorById(this.doctorId);
        })
      )
      .subscribe({
        next: doctor => this.doctor = doctor,
        error: err => console.error('Failed to load doctor', err)
      });
  }

  book() {
    if (!this.auth.isUser()) {
      this.bookMsg = 'You must be logged in as User to book.';
      return;
    }

    if (!this.date || !this.timeSlot) {
      this.bookMsg = 'Please select date and time slot.';
      return;
    }

    const dto = {
      userId: this.auth.getUserId(),
      doctorId: this.doctorId,
      appointmentDate: this.date,
      timeSlot: this.timeSlot
    };

    this.appointmentSvc.book(dto).subscribe({
      next: () => this.bookMsg = 'Appointment booked successfully!',
      error: () => this.bookMsg = 'Failed to book appointment.'
    });
  }

  rate() {
    if (!this.auth.isUser()) {
      this.rateMsg = 'You must be logged in as User to rate.';
      return;
    }

    this.doctorSvc.rateDoctor(this.doctorId, this.ratingValue).subscribe({
      next: () => {
        this.rateMsg = 'Rating submitted successfully!';
        this.doctorSvc.getDoctorById(this.doctorId).subscribe(doc => this.doctor = doc);
      },
      error: () => this.rateMsg = 'Failed to submit rating.'
    });
  }

  editDoctor() {
    this.router.navigate(['/admin/doctors/edit', this.doctorId]);
  }

  deleteDoctor() {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorSvc.deleteDoctor(this.doctorId).subscribe({
        next: () => this.router.navigate(['/doctors']),
        error: () => alert('Failed to delete doctor')
      });
    }
  }
}
