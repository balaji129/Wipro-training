import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  form: FormGroup;
  error = '';
  returnUrl = '/doctors';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    const qp = this.route.snapshot.queryParamMap.get('returnUrl');
    if (qp) this.returnUrl = qp;
  }

  submit() {
    if (this.form.invalid) return;
    this.error = '';
    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl|| '/doctors'),
      error: err => this.error = err?.error || 'Login failed'
    });
  }
}
