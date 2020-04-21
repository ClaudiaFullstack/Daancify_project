import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// componentes
import { ClassesListComponent } from './classes-list.component';
import { ClassesDetailModalComponent } from './classes-detail-modal/classes-detail-modal.component';


const routes: Routes = [
  { path: '', component: ClassesListComponent },
  { path: 'new', component: ClassesDetailModalComponent },
  { path: ':id', component: ClassesDetailModalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesListRoutingModule { }
