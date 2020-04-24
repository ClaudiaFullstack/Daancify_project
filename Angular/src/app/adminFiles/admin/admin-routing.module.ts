import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {AdminComponent} from './admin.component';
import {UsersListComponent} from './users-list/user-list.component';
import {ClassesListComponent} from './classes-list/classes-list.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { AuthGuardAdmin } from 'src/app/core/guards/auth-guard-admin';




const routes: Routes = [

    {
        path: '',
        component: AdminComponent,canActivate: [AuthGuardAdmin]
    }, {
        path: 'user',
        component: UsersListComponent,canActivate: [AuthGuardAdmin]
    }, {
        path: 'teacher',
        component: TeachersListComponent,canActivate: [AuthGuardAdmin]
    }, {
        path: 'class',
        component: ClassesListComponent,canActivate: [AuthGuardAdmin]
    },
    {path: '**', pathMatch: 'full', redirectTo: 'admin'},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
