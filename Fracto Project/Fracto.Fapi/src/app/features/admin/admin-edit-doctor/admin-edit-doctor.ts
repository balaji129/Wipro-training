import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Doctor } from '../../../models/doctor';

@Component({
  selector: 'app-admin-edit-doctor',
  templateUrl: './admin-edit-doctor.html',
  styleUrls: ['./admin-edit-doctor.css']
})
export class AdminEditDoctorComponent implements OnInit {
  form: FormGroup;
  doctorId!: number;

  constructor(
    private fb: FormBuilder,
    private doctorSvc: DoctorService,
    private route: ActivatedRoute,
    public router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      specializationId: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    if (!this.tokenStorage.isAdmin()) {
      alert('Access denied. Admins only.');
      this.router.navigate(['/']);
      return;
    }

    const id = this.route.snapshot.params['id'];
    if (id) { this.doctorId = +id; this.loadDoctor(); }
  }

  loadDoctor(): void {
    this.doctorSvc.getDoctorById(this.doctorId).subscribe({
      next: (doctor: Doctor) => this.form.patchValue(doctor),
      error: () => alert('Failed to load doctor')
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.doctorSvc.updateDoctor(this.doctorId, this.form.value).subscribe({
      next: () => {
        alert('Doctor updated successfully');
        this.router.navigate(['/admin']);
      },
      error: () => alert('Update failed')
    });
  }
}
