import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App } from './app';
import { AppRouting } from './app-routing-module';
import { TokenInterceptor } from './core/token-interceptor';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { DoctorListComponent } from './features/doctor/doctor-list/doctor-list';
import { DoctorDetailComponent } from './features/doctor/doctor-detail/doctor-detail';
import { AppointmentList } from './features/appointment/appointment-list/appointment-list';
import { AuthLandingComponent } from './features/auth/auth-landing/auth-landing';
import { NavbarComponent } from './features/shared/navbar/navbar';
import { UserNamePipe } from './features/shared/user-name-pipe';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminEditDoctorComponent } from './features/admin/admin-edit-doctor/admin-edit-doctor';

@NgModule({
  declarations: [
    App, NavbarComponent, DoctorListComponent, DoctorDetailComponent, AppointmentList, Login, Register, AuthLandingComponent, UserNamePipe, AdminDashboardComponent, AdminEditDoctorComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRouting],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [App]
})
export class AppModule {}
