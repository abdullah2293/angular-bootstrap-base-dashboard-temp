import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class AuthService {
  constructor(private storage:LocalstorageService) {}
  // ...

  public isAuthenticated(): boolean {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    const token = this.getToken()
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }

  getToken(){
    return this.storage.getToken()
  }
}