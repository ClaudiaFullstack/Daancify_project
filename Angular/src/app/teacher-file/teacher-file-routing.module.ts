import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardTeacher } from '../core/guards/auth-guard-teacher';
import { TeacherFileComponent } from './teacher-file.component';
import { TeacherMyClassComponent } from './teacher-my-class/teacher-my-class.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherSchoolComponent } from './teacher-school/teacher-school.component';

const routes: Routes = [{
  path: '', component: TeacherFileComponent, canActivate: [AuthGuardTeacher],
  children: [
    { path: 'my-class', component: TeacherMyClassComponent, canActivate: [AuthGuardTeacher] },
    { path: 'home', component: TeacherHomeComponent, canActivate: [AuthGuardTeacher] },
    { path: 'dance-school', component: TeacherSchoolComponent, canActivate: [AuthGuardTeacher] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherFileRoutingModule { }
