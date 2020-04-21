import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

// Componentes
import { TeachersGridComponent } from './teachers-grid/teachers-grid.component';
import { TeachersFilterComponent } from './teachers-filter/teachers-filter.component';
import { TeacherDetailModalComponent } from './teacher-detail-modal/teacher-detail-modal.component';
import { TeachersListComponent } from './teachers-list.component';
import { TeachersListRoutingModule } from './teachers-list.routing';

@NgModule({
  declarations: [
    TeachersListComponent,
    TeachersGridComponent,
    TeachersFilterComponent,
    TeacherDetailModalComponent,


  ],
  exports: [
    TeachersListRoutingModule,
    TeachersListComponent,
    TeachersGridComponent,
    TeachersFilterComponent,
    TeacherDetailModalComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class TeachersListModule {}
