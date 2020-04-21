import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClassesListRoutingModule } from './classes-list.routing';

// componentes
import { ClassesGridComponent } from './classes-grid/classes-grid.component';
import { ClassesListComponent } from './classes-list.component';
import { ClassesFilterComponent } from './classes-filter/classes-filter.component';
import { ClassesDetailModalComponent } from './classes-detail-modal/classes-detail-modal.component';

@NgModule({
  declarations: [
    ClassesListComponent,
    ClassesGridComponent,
    ClassesFilterComponent,
    ClassesDetailModalComponent


  ],
  exports: [
    ClassesListRoutingModule,
    ClassesListComponent,
    ClassesGridComponent,
    ClassesFilterComponent,
    ClassesDetailModalComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class ClassesListModule {}
