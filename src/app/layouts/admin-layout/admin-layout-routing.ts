import { Routes } from '@angular/router';
import { BookingsComponent } from 'src/app/bookings/bookings.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AddBookingComponent } from 'src/app/add-booking/add-booking.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import {RoleGuardService as RoleGuard} from '../../services/auth/role-guard.service';

export const AdminLayoutRoutes: Routes = [

  { path: '', component: DashboardComponent},
  { 
    path: 'list/bookings', 
    component: BookingsComponent
    // canActivate:[RoleGuard],
    // data:{
    //   expectedRoles: ['super_admin','franchise_manager']
    // }
  },
  { path: 'new/booking', component: AddBookingComponent},
  { path: '**', component: PageNotFoundComponent},

];
