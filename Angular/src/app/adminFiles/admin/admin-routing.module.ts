import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {AdminComponent} from './admin.component';
import {UsersListComponent} from './users-list/user-list.component';
import {ClassesListComponent} from './classes-list/classes-list.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';




const routes: Routes = [

    {
        path: '',
        component: AdminComponent
    }, {
        path: 'user',
        component: UsersListComponent
    }, {
        path: 'teacher',
        component: TeachersListComponent
    }, {
        path: 'class',
        component: ClassesListComponent
    },
    {path: '**', pathMatch: 'full', redirectTo: 'admin'},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
