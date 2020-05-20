import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private login: LoginService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('admin')) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
    //return this.login.islogin();
    // this.router.navigate(['/admin/login']);
    // if (this.login.islogin() === true) {
    //   return true;
    // } else if (this.login.islogin() === false) {
    //   this.router.navigate(['/admin/login']);
    //   return false;
    // }
  }
}
