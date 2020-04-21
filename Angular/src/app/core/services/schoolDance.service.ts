import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SchoolDance } from '../../models/schoolDance';



@Injectable({
  providedIn: 'root'
})
export class SchoolDanceService {

  constructor(private httpClient: HttpClient) { }

  // Get DANCE SCHOOL
  getAllSchoolDance(): Observable<SchoolDance> {
    const url = `http://localhost:3000/schoolDance`;
    return this.httpClient.get<SchoolDance>(url);
  }
  // SAVE DANCE SCHOOL
  createDanceSchool(newDanceSchool: SchoolDance): Observable<SchoolDance> {
    const url = `http://localhost:3000/schoolDance/create `;
    return this.httpClient.post<SchoolDance>(url, newDanceSchool);
  }

  // Ver todas las escuela danza creadas por un profesor
  getSchoolDancesbyTeacher(owned_by_user_id): Observable<SchoolDance[]> {
    const url = `http://localhost:3000/schoolDance/${owned_by_user_id} `;
    return this.httpClient.get<SchoolDance[]>(url);
  }

  //Actualizar Escuela de baile
  updateDanceSchool(newDanceSchool): Observable<SchoolDance[]> {
    const url = `http://localhost:3000/schoolDance/update/${newDanceSchool.dance_school_id} `;
    return this.httpClient.post<SchoolDance[]>(url,newDanceSchool);
  }
  deleteDanceSchool(dance_school_id): Observable<SchoolDance[]> {
    const url = ` http://localhost:3000/schoolDance/delete/${dance_school_id} `;
    return this.httpClient.get<SchoolDance[]>(url);
  }

}
