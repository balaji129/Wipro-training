import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-landing',
  templateUrl: './auth-landing.html',
  styleUrls: ['./auth-landing.css'],
  standalone: false
})
export class AuthLandingComponent {
  constructor(private router: Router) {}
  goToLogin() { this.router.navigate(['/login']); }
  goToRegister() { this.router.navigate(['/register']); }
}
