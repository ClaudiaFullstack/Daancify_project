import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core//guards/auth-guard';
import { AuthGuardStudent } from './core//guards/auth-guard-student';
// Components
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { RegisterComponent } from './core/register/register.component';
import { StudentComponent } from './studentFiles/student/student.component';
import { AdminComponent } from './adminFiles/admin/admin.component';
import { TeacherClassComponent } from './teacher-class/teacher-class.component';
import { ProfileComponent } from './core/profile/profile.component';






const routes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegisterComponent
  },
  {
    path: 'profile/:id', component: ProfileComponent
  },
  {
    path: 'teacher-class/:id', component: TeacherClassComponent
  },
  { path: 'teacher', loadChildren: () => import('./teacher-file/teacher-file.module').then(m => m.TeacherFileModule) },
  { path: 'student', loadChildren: () => import('./student-file/student-file.module').then(m => m.StudentFileModule) },
  { path: 'admin', loadChildren: () => import('./adminFiles/admin/admin.module').then(m => m.AdminModule) },


  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // {
    //   useHash: false
    // },
    {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
