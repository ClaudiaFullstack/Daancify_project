import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { UsersListComponent } from './user-list.component';


const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'new', component: UserDetailModalComponent },
  { path: ':id', component: UserDetailModalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersListRoutingModule { }
