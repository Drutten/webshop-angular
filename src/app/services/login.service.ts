import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //username = '';
  private loggedIn = false;
  private isLoggedIn = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedIn.asObservable();
  // private loggedInUser = new Subject<string>();
  // loggedInUser$ = this.loggedInUser.asObservable();


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

  // changeLoggedInState() {
  //   this.loggedIn = !this.loggedIn;
  //   // this.isLoggedIn.next(this.loggedIn);
  //   // if (username && this.loggedIn) {
  //   //   this.username = username;
  //   //   this.loggedInUser.next(this.username);
  //   // }
  //   // else {
  //   //   this.loggedInUser.next('');
  //   // }
  // }
}
