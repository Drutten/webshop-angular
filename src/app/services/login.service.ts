import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ILoginService } from '../interfaces/i-login-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginService{
  private loggedIn = false;
  private isLoggedIn = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedIn.asObservable();


  constructor(private router: Router) { }

  login() {
    this.loggedIn = true;
    this.isLoggedIn.next(this.loggedIn);
    this.router.navigate(['/admin/ordrar']);
  }

  logout() {
    this.loggedIn = false;
    this.isLoggedIn.next(this.loggedIn);
  }

  getIsLoggedIn(): boolean {
    return this.loggedIn;
  }
  
}
