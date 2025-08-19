import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-hobbies',
  standalone: false,
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css'
})
export class HobbiesComponent {
  @Input() myhobbies: any[] = [];

  toggleFavorite(hobby: any) {
    hobby.fav = !hobby.fav;
    console.log(`${hobby.name} is now ${hobby.fav ? 'a favorite' : 'not a favorite'}.`);
  }

}
