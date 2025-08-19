import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  username = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  registerUser() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.username === this.username)) {
      this.message = 'Username already exists';
      return;
    }

    users.push({ username: this.username, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));
    this.message = 'Signup successful! Redirecting...';

    setTimeout(() => this.router.navigate(['/login']), 1000);
  }
}
