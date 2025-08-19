import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noSpacesValidator } from '../../validators/no_space.validator';
@Component({
  selector: 'app-reactiveform',
  standalone: false,
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css'
})
export class ReactiveformComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group(
      {
      email: ['', [Validators.required, Validators.email, noSpacesValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
  );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm);
      alert('Login Successful!');
    } else {
      this.loginForm.markAllAsTouched(); // Show errors
    }
  }
}
