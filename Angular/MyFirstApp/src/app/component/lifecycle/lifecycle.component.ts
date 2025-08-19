import { Component, Input, OnChanges, OnInit, DoCheck,
         AfterContentInit, AfterContentChecked,
         AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: false,
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css'
})
export class LifecycleComponent implements 
  OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() data!: string;

  constructor() {
    console.log('Constructor: Child created');
  }

  ngOnChanges() {
    console.log('ngOnChanges: Input data changed');
  }

  ngOnInit() {
    console.log('ngOnInit: Component initialized');
  }

  ngDoCheck() {
    console.log('ngDoCheck: Change detection run');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit: Content projected');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked: Projected content checked');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit: View initialized');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked: View checked');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: Component is being destroyed');
  }
}