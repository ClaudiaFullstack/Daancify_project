import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  // CREAR UN USUARIO NUEVO
  saveUser(user: User): Observable<User> {
    const url = 'http://localhost:3000/users/saveUser';
    return this.httpClient.post<User>(url, user);
  }

  // Obtener usuarios
  getUsers(): Observable<User[]> {
    const url = 'http://localhost:3000/users';
    return this.httpClient
      .get<User[]>(url)
      .pipe(map((x) => x.map((u) => new User(u))));
  }

  // Obtener usuario
  getUser(id: string): Observable<User> {
    const url = '/assets/mocks/user.json';
    return this.httpClient.get<User>(url).pipe(map((x) => new User(x)));
  }

  // Obtener un usuario por id
  getUserId(id: number): Observable<User> {
    const url = `http://localhost:3000/users/${id}`;
    return this.httpClient.get<User>(url);
  }

  // Update user
  updateUser(user: User): Observable<User> {
    const url = `http://localhost:3000/users/edit/${user.user_id}`;
    return this.httpClient.post<User>(url, user);
  }

  // Filtrado de busqueda
  search(filter: User): Observable<User[]> {
    const url = 'http://localhost:3000/users/search';
    return this.httpClient
      .post<User[]>(url, filter)
      .pipe(map((x) => x.map((u) => new User(u))));
  }

  // Borrar usuario
  delete(id: number): Observable<User> {
    const url = `http://localhost:3000/users/delete/${id}`;
    return this.httpClient.get<User>(url);


  }
   // TODOS LOS PROFESORES
   getTeachers(): Observable<User[]> {
    const url = 'http://localhost:3000/users/teachers';
    return this.httpClient.get<User[]>(url).pipe(map(x => x.map(u => new User(u))));

  }

     // TODOS LOS PROFESORES PARA ADMIN
     getAdminTeachers(): Observable<User> {
      const url = 'http://localhost:3000/users/teachersAdmin';
      return this.httpClient.get<User>(url);

    }

  // Profesor info por id

  getTeacherId(id): Observable<User[]> {
   const url = `http://localhost:3000/users/${id}`;
   return this.httpClient.get<User[]>(url).pipe(map(x => x.map(u => new User(u))));

 }


 // IMAGE
      updateFile(formData,user_id): Observable<any[]> {
        const url = `http://localhost:3000/users/profile/${user_id}`;
        return this.httpClient.post<any[]>(url,formData);

}

}
