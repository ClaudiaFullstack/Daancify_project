import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Class } from './../../models/class';
import { DanceStyle } from '../../models/danceStyle';
import { StudentClass } from 'src/app/models/studentClass';
import { SignUp } from 'src/app/models/signUp';
@Injectable({
    providedIn: 'root'
})
export class ClassService {
    constructor(private httpClient: HttpClient) { }
    // SAVE CLASS
    createClass(newClass: Class, id: number): Observable<Class> {
        const teacher_id = id;
        const url = `http://localhost:3000/class/create/${teacher_id}`;
        return this.httpClient.post<Class>(url, newClass);
    }
    createClassAdmin(newclass: Class): Observable<Class> {
      const url = 'http://localhost:3000/class/createAdmin';
      return this.httpClient.post<Class>(url, newclass);
    }

    // Todos los estilos de bailes
    getAllDanceStyle(): Observable<DanceStyle> {
        const url = `http://localhost:3000/class/danceStyle`;
        return this.httpClient.get<DanceStyle>(url);
    }

    getClassTeacher(teacher_id): Observable<StudentClass[]> {
        const url = `http://localhost:3000/class/teacher/${teacher_id}`;

        return this.httpClient.get<StudentClass[]>(url);
    }

    getAllClaseTime(teacher_id): Observable<Class> {

        const url = `http://localhost:3000/class/teacherClass/${teacher_id}`;
        return this.httpClient.get<Class>(url);
    }

    // EDIT CLASS
    updateClass(editClass): Observable<Class> {
        const url = `http://localhost:3000/class/update/${editClass.class_id}`;
        return this.httpClient.post<Class>(url, editClass);
    }
        // EDIT CLASS
    updateClassAdmin(editClass): Observable<Class> {
        const url = `http://localhost:3000/class/updateClassAdmin`;
        return this.httpClient.post<Class>(url, editClass);
    }

    // Delete CLASS
    deleteClass(class_id): Observable<Class> {
        const url = `http://localhost:3000/class/delete/${class_id}`;
        return this.httpClient.get<Class>(url);
    }

    // SEE ALL CLASS BY DATE
    getAllClassByDate(): Observable<StudentClass[]> {
        const url = `http://localhost:3000/class/student`;
        return this.httpClient.get<StudentClass[]>(url);
    }

    // SEE ALL CLASS SignUP
    getClassSignUp(user_id): Observable<StudentClass[]> {
        const url = `http://localhost:3000/class/signUp/${user_id}`;
        return this.httpClient.get<StudentClass[]>(url);
    }
    // Apuntarse a las clases
    ClassSignUp(register): Observable<SignUp> {
        const url = `http://localhost:3000/class/register`;
        return this.httpClient.post<SignUp>(url, register);
    }
    // Ver si esta apuntado a una clase
    seeRegister(register): Observable<SignUp[]> {
        const url = `http://localhost:3000/class/seeRegister`;
        return this.httpClient.post<SignUp[]>(url, register);
    }
    // quitarte de la clase apuntado
    deleteClassSignUp(register): Observable<SignUp[]> {
        const url = `http://localhost:3000/class/deleteSignUp`;
        return this.httpClient.post<SignUp[]>(url, register);
    }
    getAllClass(): Observable<Class[]> {
        const url = 'http://localhost:3000/class';
        return this.httpClient
            .get<Class[]>(url)
            .pipe(map((x) => x.map((u) => new Class(u))));
    }


    // Filtro de clases
    getAllClassFilter(filter): Observable<StudentClass[]> {
        const url = 'http://localhost:3000/class/classFilter';
        return this.httpClient
            .post<StudentClass[]>(url, filter);
    }

    getAllAdminClassFilter(filter): Observable<Class[]> {
        const url = 'http://localhost:3000/class/classFilter';
        return this.httpClient
            .post<Class[]>(url, filter);
    }

}


