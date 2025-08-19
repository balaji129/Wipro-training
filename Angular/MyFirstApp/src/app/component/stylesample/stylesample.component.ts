import { Component } from '@angular/core';

@Component({
  selector: 'app-stylesample',
  standalone: false,
  templateUrl: './stylesample.component.html',
  styleUrl: './stylesample.component.css'
})
export class StylesampleComponent {
  isSpecial = true;
  isHighlighted = false;

  toggleSpecial() {
    this.isSpecial = !this.isSpecial;
  }

  toggleHighlight() {
    this.isHighlighted = !this.isHighlighted;
  }
}