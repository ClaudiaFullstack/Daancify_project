import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Chart } from 'src/app/models/Chart';


@Injectable({
  providedIn: 'root'
})
export class ChartService {

constructor(private httpClient: HttpClient) { }

 // Obtener count usuarios creados (Borrados y activos)
 getCreatedUsers(): Observable<any> {
  const url = 'http://localhost:3000/chart';
  return this.httpClient
    .get<any>(url);
}
// getCreatedUsers(): Observable<any> {
//   return this.httpClient.get('http://localhost:3000/chart');
// }


 // Obtener count (Usuarios Activos)
 getActiveUsers(): Observable<Chart[]> {
  const url = 'http://localhost:3000/chart/activeUsers';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

 // Users (Usuarios Borrados)
 getErasedUsers(): Observable<Chart[]> {
  const url = 'http://localhost:3000/chart/erasedUsers';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

 // Classes (Activas y borradas)
 getCreatedClasses(): Observable<Chart[]> {
  const url = 'http://localhost:3000/chart/createdClasses';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

// Class (Activas)
 getActiveClasses(): Observable<Chart[]> {
  const url = 'http://localhost:3000/chart/activeClasses';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

// Class (Borradas)
 getErasedClasses(): Observable<Chart[]> {
  const url = 'http://localhost:3000/chart/erasedClasses';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

// clases realizadas en 2020
 getCreatedClasses2020(): Observable<Chart[]> {
  const url = 'http://localhost:3000/Chart';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

// Teachers (Borrados y activos)
 getcreatedTeachers(): Observable<Chart[]> {
  const url = 'http://localhost:3000/chart/createdClasses2020';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

// Teachers (Activos)
 getActiveTeachers(): Observable<Chart[]> {
  const url = 'http://localhost:3000/chart/createdTeachers';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

// Teachers (Borrados)
 getErasedTeachers(): Observable<Chart[]> {
  const url = 'http://localhost:3000/chart/erasedTeachers';
  return this.httpClient
    .get<Chart[]>(url)
    .pipe(map((x) => x.map((u) => new Chart(u))));
}

}

















