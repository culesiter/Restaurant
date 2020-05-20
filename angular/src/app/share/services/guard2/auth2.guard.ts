import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { LoginService } from '../login.service';

@Injectable()
export class Auth2Guard implements CanActivate {
  constructor(private router: Router, private login: LoginService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (sessionStorage.getItem('staff')) {
        return true;
      } else {
        this.router.navigate(['/staff/staff_login']);
        return false;
      }
  }
}
