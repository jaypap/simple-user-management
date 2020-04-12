import { Routes } from '@angular/router';


// Components
import { UserListComponent } from './users/users-list/users-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

export const routes: Routes = [
    /* /users url path  redirect to users */
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            {
                path: 'users',
                component: UserListComponent
            }
        ]
    }
];
