import { Subject } from 'rxjs';
import { ILoginService } from '../interfaces/i-login-service';

export class LoginServiceMock implements ILoginService {
  loggedIn = false;
  isLoggedIn = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedIn.asObservable();
  
  login() {
    this.loggedIn = true;
    this.isLoggedIn.next(this.loggedIn);
  }

  logout() {
    this.loggedIn = false;
    this.isLoggedIn.next(this.loggedIn);
  }

  getIsLoggedIn() {
    return this.loggedIn;
  }
}
