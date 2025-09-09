import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:false,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  form: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['User', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.message = '';
    this.error = '';
    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.message = 'Registration successful — please login.';
        this.router.navigate(['/login']);
      },
      error: err => this.error = err?.error || 'Registration failed'
    });
  }
}

