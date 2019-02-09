import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  token:any;
  user:any;
  role:any;
  
  constructor() { }

  updateStorage(data){

    localStorage.setItem('token',JSON.stringify(data.token))
    localStorage.setItem('user',JSON.stringify(data.user))
    return console.log('storage updated successfully!');

  }

  ifTokenExists(){
    return JSON.parse(localStorage.getItem('token'))
  }

  getToken(){

    if(this.ifTokenExists()){
      return JSON.parse(localStorage.getItem('token')).access_token;
    }
    return '';
    
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'))
  }

  getRole(){
    let user = this.getUser()
    return user.roles[0]
  }

  remove(){

    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return console.log('storage updated successfully!');
    
  }


}
