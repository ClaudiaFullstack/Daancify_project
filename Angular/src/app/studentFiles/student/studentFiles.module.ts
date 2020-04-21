import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [StudentComponent],
  exports: [StudentComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  providers: [],
})
export class StudentFilesModule {}
