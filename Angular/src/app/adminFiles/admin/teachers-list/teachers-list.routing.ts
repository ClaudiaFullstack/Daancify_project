import { Routes, RouterModule } from '@angular/router';
import { TeachersListComponent } from './teachers-list.component';
import { TeacherDetailModalComponent } from './teacher-detail-modal/teacher-detail-modal.component';
import { NgModule } from '@angular/core';
import { TeacherCreateModalComponent } from './teacher-create-modal/teacher-create-modal.component';

const routes: Routes = [
  { path: '', component: TeachersListComponent },
  { path: 'new', component: TeacherCreateModalComponent },
  { path: ':id', component: TeacherDetailModalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersListRoutingModule { }
