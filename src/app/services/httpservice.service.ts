import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {

  api_token: any;
  user_id: any;
  endpoint: any = 'http://localhost:8100';
  tempData: any;

  constructor(public http: HttpClient, public router: Router) {

  }



  public post_method(url, post, append: any = false) {

    let headers: any;
    let user_data = JSON.parse(localStorage.getItem('user_data'));

    if (post != '') {
      headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    return this.http
      .post(this.endpoint + url, post, { headers: headers })
      .pipe(map(
        success => {
          this.tempData = success
          return this.tempData
        },
        err => {
          return err;
        }
      ));
  }

}