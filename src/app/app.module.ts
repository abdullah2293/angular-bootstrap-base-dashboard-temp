import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { BookingsComponent } from './bookings/bookings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new/booking', component: AddBookingComponent },
  { path: 'list/bookings', component: BookingsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBookingComponent,
    BookingsComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
