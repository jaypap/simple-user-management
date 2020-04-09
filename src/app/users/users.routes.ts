import { Routes } from '@angular/router';

// Components
import { UserListComponent } from './users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export const usersRoutes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: '',
                component: UserListComponent
            }
           /*  {
                path: 'edit/:id',
                component: UserEditComponent
            } */
        ]
    }
];
