
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { UsersListRoutingModule } from './user-list.routing';

// componentes
import { UsersListComponent } from './user-list.component';
import { UsersGridComponent } from './users-grid/users-grid.component';
import { UsersFilterComponent } from './users-filter/users-filter.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersGridComponent,
    UsersFilterComponent,
    UserDetailModalComponent,


  ],
  exports: [
    UsersListRoutingModule,
    UsersListComponent,
    UsersGridComponent,
    UsersFilterComponent,
    UserDetailModalComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class UserListModule {}
