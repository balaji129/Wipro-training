import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { increment, decrement, reset, multiply as multiplyAction } from './counter/counter.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('testingapp');
 counter$: Observable<number>;

   factor: number = 3;
  constructor(private store: Store<{counter: number}>){
   this.counter$ = store.select('counter');
  }
  add(){
    // Dispatch increment action
    this.store.dispatch(increment());
  }
  minus(){
    // Dispatch decrement action
    this.store.dispatch(decrement());
  }
  reset(){
    this.store.dispatch(reset());
  }
   multiply() {
    this.store.dispatch(multiplyAction({ factor: this.factor }));
  }
}
