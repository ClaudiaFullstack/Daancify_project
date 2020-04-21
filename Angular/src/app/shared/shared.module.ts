import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    NopagefoundComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule,
    MaterialFileInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatGridListModule,
    MatExpansionModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    NopagefoundComponent,
    NopagefoundComponent,
    MaterialFileInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatGridListModule,
    MatExpansionModule,

  ],
})
export class SharedModule {}
