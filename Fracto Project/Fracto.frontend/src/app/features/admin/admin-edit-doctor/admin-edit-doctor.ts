import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor';
import { Doctor } from '../../../models/doctor';

@Component({
  selector: 'app-admin-edit-doctor',
  standalone: false,  
  templateUrl: './admin-edit-doctor.html',
  styleUrls: ['./admin-edit-doctor.css']
})
export class AdminEditDoctorComponent implements OnInit {
  form: FormGroup;
  doctorId!: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private doctorSvc: DoctorService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      specializationId: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = Number(id);
        this.loadDoctor();
      }
    });
  }

  loadDoctor(): void {
    this.loading = true;
    this.doctorSvc.getDoctorById(this.doctorId).subscribe({
      next: (doctor: Doctor) => {
        this.form.patchValue({
          name: doctor.name,
          city: doctor.city,
          specializationId: doctor.specializationId,
          rating: doctor.rating
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to load doctor details.');
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.doctorSvc.updateDoctor(this.doctorId, this.form.value).subscribe({
      next: () => {
        alert('Doctor updated successfully.');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        alert('Update failed.');
      }
    });
  }
}
