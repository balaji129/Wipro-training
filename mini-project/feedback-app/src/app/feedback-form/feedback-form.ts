import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FeedbackService } from '../feedback.services';

@Component({
  selector: 'app-feedback-form',
  standalone: false,
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackForm {
  submitting = false;
  msg = '';
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: FeedbackService) {
    // Initialize form inside constructor so fb is already injected
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      rating: [5, [Validators.required]],
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ]
      ]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { name, email, rating, comment } = this.form.value;

    this.store.add({
      name: name!.trim(),
      email: email!.trim(),
      rating: Number(rating),
      comment: comment!.trim()
    });

    this.submitting = false;
    this.msg = 'Thanks! Your feedback was recorded.';
    this.form.reset({ rating: 5 });

    setTimeout(() => (this.msg = ''), 2500);
  }
}
