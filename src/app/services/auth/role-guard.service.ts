import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { LocalstorageService } from '../storage/localstorage.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router,private storage:LocalstorageService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRoles = route.data.expectedRoles;
    // get roles from storage
    const role = this.storage.getRole();
    
    if (
      !this.auth.isAuthenticated() || 
      !expectedRoles.includes(role.name)
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}