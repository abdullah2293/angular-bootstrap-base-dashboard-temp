import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AdminLayoutRoutes } from '../admin-layout/admin-layout-routing';
import { AddBookingComponent } from 'src/app/add-booking/add-booking.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { BookingsComponent } from 'src/app/bookings/bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
    
  ],
  declarations: [
    DashboardComponent,
    AddBookingComponent,
    PageNotFoundComponent,
    BookingsComponent, 
  ]
})

export class AdminLayoutModule {}
