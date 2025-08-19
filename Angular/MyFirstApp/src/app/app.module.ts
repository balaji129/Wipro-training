import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FileOpsComponent } from './component/file-ops/file-ops.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UsersComponent } from './component/users/users.component';
import { MenuComponent } from './component/menu/menu.component';
import { BodyComponent } from './component/body/body.component';
import { HobbiesComponent } from './component/hobbies/hobbies.component';
import { FavouriteComponent } from './component/favourite/favourite.component';
import { HighlightDirective } from './directives/highlight.directive';
import { StylesampleComponent } from './component/stylesample/stylesample.component';
import { Style2Component } from './component/style2/style2.component';
import { ReversepipePipe } from './pipes/reversepipe.pipe';
import { LifecycleComponent } from './component/lifecycle/lifecycle.component';
import { MypipePipe } from './pipes/mypipe.pipe';
import { SignalComponent } from './component/signal/signal.component';
import { HtmlformComponent } from './component/htmlform/htmlform.component';
import { ReactiveformComponent } from './component/reactiveform/reactiveform.component';


@NgModule({
  declarations: [
    AppComponent,
    FileOpsComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    MenuComponent,
    BodyComponent,
    HobbiesComponent,
    FavouriteComponent,
    HighlightDirective,
    StylesampleComponent,
    Style2Component,
    ReversepipePipe,
    LifecycleComponent,
    MypipePipe,
    SignalComponent,
    HtmlformComponent,
    ReactiveformComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
        ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }