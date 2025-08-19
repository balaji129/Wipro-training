import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: false,
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  @Input() link: string = '';
  @Input() myhobbies: any[] = [];
  content: string = '';

  ngOnChanges() {
    switch (this.link) {
      case 'hobby':
        this.content = 'My hobbies include reading, travelling, and coding.';
        break;
      case 'new':
        this.content = 'I am exploring new hobbies like painting and hiking.';
        break;
      case 'fav':
        this.content = 'My favorite hobby is reading mystery novels.';
        break;
      default:
        this.content = 'Please select a hobby from the menu.';
    }
  } 

}
