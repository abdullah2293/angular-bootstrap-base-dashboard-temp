import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../services/storage/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  visible:any = false;
  type:any = 'password';
  loginform: FormGroup;
  URL:any = 'http://localhost:8100/franchise/login';
  responce:any;

  constructor(private http: HttpClient,private storage: LocalstorageService,private router: Router) { 

    this._setupLoginForm()

  }

  ngOnInit() {
  }

  _setupLoginForm(){
    this.loginform = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  getFormControl(field) {
    return this.loginform.get(field);
  }

  onSubmit(){

    if(this.loginform.invalid){
      return console.warn('invalide form input.')
    }

    this.login(this.loginform.value)
        .subscribe(
          (success) => {
            this.updateStorage(success)
            this.router.navigate([''])
          },
          (err) => {
            console.log(err)
          }
        )
  }

  login(input){
    
    let headers = new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    });
    
    let params = 'username='+input.username+
                 '&password='+input.password

    return this.http
      .post(this.URL, params, {headers:headers})
      .pipe(
        map(
          success => {
            return success
          },
          err => {
            return err
          }
        )
      );
  }

  updateStorage(data){
    this.storage.updateStorage(data)
  }

  toggleVisibility(){
    
    this.visible = !this.visible;
    if(this.visible)
      this.type = 'text'
    if(!this.visible)
      this.type = 'password'
  }
}
