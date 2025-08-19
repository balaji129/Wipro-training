import { Component } from '@angular/core';

@Component({
  selector: 'app-style2',
  standalone: false,
  templateUrl: './style2.component.html',
  styleUrl: './style2.component.css'
})
export class Style2Component {
textColor = 'blue';
fontSize = 16;

changeColor() {
  this.textColor = this.textColor === 'blue' ? 'red' : 'blue';
}

increaseFont() {
  this.fontSize += 2;
}

}
