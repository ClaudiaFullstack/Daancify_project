import { Injectable } from '@angular/core';
import { UserIdentity } from '../../models/user-identity';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APP_USER = 'APP_USER';

  private $user = new BehaviorSubject(this.getUser());

  constructor() {
    if (this.isUserAuthenticated()) {
      this.$user.next(this.getUser());
    }
  }

  storeUser(user: UserIdentity) {
    localStorage.setItem(this.APP_USER, JSON.stringify(user));
    this.$user.next(user);
    // setTimeout(() => {
    //   this.logout();
    //   this.$user.next(null);
    // }, 5000);
  }

  isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  getUser(): UserIdentity {
    const c = localStorage.getItem(this.APP_USER);
    if (c) {
       const newUser = new UserIdentity(JSON.parse(c));
       return newUser;
    }

    return null;
  }

  logout() {
    localStorage.removeItem(this.APP_USER);
  }

  // getBearer(): string {
  //   if (this.isUserAuthenticated()) {
  //     console.log(this.getUser().token);
  //     return 'Bearer ' + this.getUser().token;
  //   }

  // }

  get User(): Observable<UserIdentity> {
    return this.$user.asObservable();
  }

}
