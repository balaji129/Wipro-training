import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { DoctorListComponent} from './features/doctor/doctor-list/doctor-list';
import { DoctorDetailComponent } from './features/doctor/doctor-detail/doctor-detail';
import { AppointmentList } from './features/appointment/appointment-list/appointment-list';
import { AuthGuard } from './core/auth-guard';
import { AuthLandingComponent } from './features/auth/auth-landing/auth-landing';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard';
import { RoleGuard } from './core/role-guard';
import { AdminEditDoctorComponent } from './features/admin/admin-edit-doctor/admin-edit-doctor';
import { AdminEditAppointmentComponent } from './features/admin/edit-appointment/edit-appointment.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthLandingComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/:id', component: DoctorDetailComponent },
  { path: 'appointments', component: AppointmentList, canActivate: [AuthGuard], data: { role: 'User' } },
  {path : 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' }},
  {path : 'admin/add-doctor', component: AdminEditDoctorComponent, canActivate: [AuthGuard], data: { role: 'Admin' }},
  { path: 'admin/edit-doctor:id', component: AdminEditDoctorComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'admin/add-appointment:id', component: AdminEditAppointmentComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'admin/edit-appointment:id', component: AdminEditAppointmentComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
   { path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}
