import { Component } from '@angular/core';

@Component({
  selector: 'app-htmlform',
  standalone: false,
  templateUrl: './htmlform.component.html',
  styleUrl: './htmlform.component.css'
})
export class HtmlformComponent {
  onSubmit(form: any) {
    console.log('Form submitted:', form.value);
  }

}
