import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardStudent } from '../core/guards/auth-guard-student';
import { StudentFileComponent } from './student-file.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { StudentMyClassComponent } from './student-my-class/student-my-class.component';
import { StudentTeacherComponent } from './student-teacher/student-teacher.component';
import { StudentTeacherClassComponent } from './student-teacher-class/student-teacher-class.component';

const routes: Routes = [{ path: '', component: StudentFileComponent, canActivate: [AuthGuardStudent],
children: [

  {path: 'class', component: StudentClassComponent, canActivate: [AuthGuardStudent]},
  {path: 'my-class', component: StudentMyClassComponent, canActivate: [AuthGuardStudent]},
  {path: 'teacher', component: StudentTeacherComponent, canActivate: [AuthGuardStudent]},
  {path: 'teacher/:id', component: StudentTeacherClassComponent, canActivate: [AuthGuardStudent]}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentFileRoutingModule { }
