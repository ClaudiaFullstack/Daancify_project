import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { TeacherClassComponent } from './teacher-class/teacher-class.component';
import { AdminModule } from './adminFiles/admin/admin.module';
import { NopagefoundComponent } from '../../src/app/nopagefound/nopagefound.component';





@NgModule({
   declarations: [
      AppComponent,
      TeacherClassComponent,
      NopagefoundComponent


   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      CoreModule,
      BrowserAnimationsModule,
      AdminModule,

   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
