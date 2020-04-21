import { Routes, RouterModule } from '@angular/router';
import { TeachersListComponent } from './teachers-list.component';
import { TeacherDetailModalComponent } from './teacher-detail-modal/teacher-detail-modal.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: TeachersListComponent },
  { path: 'new', component: TeacherDetailModalComponent },
  { path: ':id', component: TeacherDetailModalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersListRoutingModule { }
