import { Component,signal } from '@angular/core';

@Component({
  selector: 'app-signal',
  standalone: false,
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css'
})
export class SignalComponent {
 count = signal(0);
 increment() {
    this.count.update(value => value + 1);
 }
 decrement() {
    this.count.update(value => value - 1);
 }
 reset() {
    this.count.set(0);
 }
}
