import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  loginUser() {
    const storedData = localStorage.getItem('users');
    if (storedData) {
      const users = JSON.parse(storedData);
      const user = users.find((u: any) => u.username === this.username && u.password === this.password);
      if (user) {
        this.message = 'Login successful!';
        setTimeout(() => this.router.navigate(['/signup']), 1000);
      } else {
        this.message = 'Invalid credentials';
      }
    } else {
      this.message = 'No registered users. Please signup first.';
    }
  }
}
