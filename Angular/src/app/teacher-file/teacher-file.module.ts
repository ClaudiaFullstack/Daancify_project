import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherFileRoutingModule } from './teacher-file-routing.module';
import { TeacherFileComponent } from './teacher-file.component';
import { TeacherMyClassComponent } from './teacher-my-class/teacher-my-class.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { SharedModule } from '../shared/shared.module';
import { TeacherSchoolComponent } from './teacher-school/teacher-school.component';


@NgModule({
  declarations: [TeacherFileComponent, TeacherMyClassComponent, TeacherHomeComponent, TeacherSchoolComponent],
  imports: [
    CommonModule,
    TeacherFileRoutingModule,SharedModule
  ]
})
export class TeacherFileModule { }
