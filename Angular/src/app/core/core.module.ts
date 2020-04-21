import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auto.interceptor';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [HeaderComponent, LoginComponent, RegisterComponent, FooterComponent, HomeComponent, ProfileComponent ],
  exports: [HeaderComponent, LoginComponent, RegisterComponent, FooterComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,

],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
