import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UserListModule } from './users-list/user-list.module';
import { CoreModule } from '../../core/core.module';
import { ChartsModule } from 'ng2-charts';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ClassesListModule } from './classes-list/classes-list.module';
import { TeachersListModule } from './teachers-list/teachers-list.module';
import { CalendarComponent } from './calendar/calendar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartService } from 'src/app/core/services/chart.service';
import { GraficosComponent } from './graficos/graficos.component';





@NgModule({
  declarations: [
    AdminComponent,
    BreadcrumbsComponent,
    GraficosComponent,
    CalendarComponent,
    SidebarComponent,



  ],
  exports: [
    AdminComponent,
    BreadcrumbsComponent,
    SharedModule,
    CalendarComponent,
    SidebarComponent,
    GraficosComponent,



  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UserListModule,
    ClassesListModule,
    TeachersListModule,
    CoreModule,
    ChartsModule,
      ],

  providers: [ChartService],

})
export class AdminModule {}
