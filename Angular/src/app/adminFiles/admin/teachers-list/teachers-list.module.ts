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
import { TeacherCreateModalComponent } from './teacher-create-modal/teacher-create-modal.component';

@NgModule({
  declarations: [
    TeachersListComponent,
    TeachersGridComponent,
    TeachersFilterComponent,
    TeacherDetailModalComponent,
    TeacherCreateModalComponent


  ],
  exports: [
    TeachersListRoutingModule,
    TeachersListComponent,
    TeachersGridComponent,
    TeachersFilterComponent,
    TeacherDetailModalComponent,
    TeacherCreateModalComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class TeachersListModule {}
