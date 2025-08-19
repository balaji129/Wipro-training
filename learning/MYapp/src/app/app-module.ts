import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [
    App,
    Login,
    Signup
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
