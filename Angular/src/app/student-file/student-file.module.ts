import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentFileRoutingModule } from './student-file-routing.module';
import { StudentFileComponent } from './student-file.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { SharedModule } from '../shared/shared.module';
import { StudentMyClassComponent } from './student-my-class/student-my-class.component';
import { StudentTeacherComponent } from './student-teacher/student-teacher.component';
import { StudentTeacherClassComponent } from './student-teacher-class/student-teacher-class.component';
import { AdminModule } from '../adminFiles/admin/admin.module';
import { ClassesListModule } from '../adminFiles/admin/classes-list/classes-list.module';


@NgModule({
  declarations: [StudentFileComponent, StudentClassComponent, StudentMyClassComponent, StudentTeacherComponent, StudentTeacherClassComponent],
  imports: [
    CommonModule,
    StudentFileRoutingModule,SharedModule,AdminModule,ClassesListModule
  ]
})
export class StudentFileModule { }
