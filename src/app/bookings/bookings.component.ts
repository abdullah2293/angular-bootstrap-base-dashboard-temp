import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  data_loaded: any = false;
  bookings: any;
  title: any = 'booking';

  constructor(public http: HttpService, public router: Router) {
    this.getBookings();
  }

  ngOnInit() {
  }

  getBookings() {
    let user_data = JSON.parse(localStorage.getItem('user_data'));
    var post = '';
    this.http.post_method('/bookings', post, true)
      .subscribe(
        success => {
          this.bookings = success.data;
          this.data_loaded = true;
        },
        err => {
          this.data_loaded = true;
        }
      )
  }

  cancel(id) {
    let confirm_del = confirm("Are you sure you  want to cancel this booking.");
    if (confirm_del == true) {
      var post = 'id=' + id
      this.http.post_method('/cancel/booking', post, true)
        .subscribe(
          success => {
            window.location.reload()
          },
          err => {
            console.log(err);
          }
        )
    } else {
      console.log('no')
    }
  }

}
