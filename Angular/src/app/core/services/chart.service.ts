import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Graficas } from 'src/app/models/graficas';



@Injectable({
  providedIn: 'root'
})
export class ChartService {

constructor(private httpClient: HttpClient) { }

 // Obtener count usuarios creados (Borrados y activos)
 getCreatedUsers(): Observable<Graficas> {
  const url = 'http://localhost:3000/chart/createdUsers';
  return this.httpClient
    .get<Graficas>(url);
}

 // Obtener count (Usuarios Activos)
 getActiveUsers(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/chart/activeUsers';
  return this.httpClient
    .get<Graficas[]>(url);
}

 // Users (Usuarios Borrados)
 getErasedUsers(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/chart/erasedUsers';
  return this.httpClient
    .get<Graficas[]>(url);
}

 // Classes (Activas y borradas)
 getCreatedClasses(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/chart/createdClasses';
  return this.httpClient
    .get<Graficas[]>(url);
}

// Class (Activas)
 getActiveClasses(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/chart/activeClasses';
  return this.httpClient
    .get<Graficas[]>(url);
}

// Class (Borradas)
 getErasedClasses(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/chart/erasedClasses';
  return this.httpClient
    .get<Graficas[]>(url);
}

// clases realizadas en 2020
 getCreatedClasses2020(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/Chart/createdClasses2020';
  return this.httpClient
    .get<Graficas[]>(url);
}

// Teachers (Borrados y activos)
 getCreatedTeachers(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/chart/createdTeachers';
  return this.httpClient
    .get<Graficas[]>(url);
}

// Teachers (Activos)
 getActiveTeachers(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/chart/activeTeachers';
  return this.httpClient
    .get<Graficas[]>(url);
}

// Teachers (Borrados)
 getErasedTeachers(): Observable<Graficas[]> {
  const url = 'http://localhost:3000/chart/erasedTeachers';
  return this.httpClient
    .get<Graficas[]>(url);
}

}


