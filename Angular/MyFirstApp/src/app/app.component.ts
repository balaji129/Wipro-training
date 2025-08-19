import { Component } from '@angular/core';
import { UrlSerializer } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
title = "My frontend app";
myhobbies:any = [{name:'Reading',fav:false}, {name:'Travelling',fav:false}];
link: string = '';
today:string = "2025-08-11";
username:string ="";
jsonData = {
  "name": "John Doe"}
 parentData = 'Initial Data';
  showChild = true;

  changeData() {
    this.parentData = 'Updated Data ' + Math.floor(Math.random() * 100);
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }


login(user: object) {
    console.log("Login caption: ", user);
  }
  menuitem(item: string) {
    this.link = item;
    console.log("Menu item clicked: ", item);
  }
}
