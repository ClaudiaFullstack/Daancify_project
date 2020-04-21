import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserIdentity } from '../../models/user-identity';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(user: any): Observable<UserIdentity> {

    // // Para Conectar a una API
    if (user) {
      const url = 'http://localhost:3000/users/login';
      return this.httpClient.post<UserIdentity>(url, user).pipe(map(x => {
        return x ? new UserIdentity(x) : null;
      }));

      // return this.httpClient.post<UserIdentity>(url, user);
    }
    return of(null);
  }

}
