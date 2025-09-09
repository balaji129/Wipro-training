import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-doctor',
  templateUrl: 'add-doctor.component.html',
  styleUrls: ['add-doctor.component.css']
})
export class AdminAddDoctorComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private doctorSvc: DoctorService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      specializationId: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    if (!this.tokenStorage.isAdmin()) {
      alert('Access denied. Admins only.');
      this.router.navigate(['/']);
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.doctorSvc.createDoctor(this.form.value).subscribe({
      next: () => {
        alert('Doctor created successfully');
        this.router.navigate(['/admin']);
      },
      error: () => alert('Creation failed')
    });
  }
}
