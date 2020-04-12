import { Routes } from '@angular/router';

// Components
import { UserListComponent } from './users-list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export const usersRoutes: Routes = [
    {
        /* /users url path  */
        path: 'users',
        children: [
            {
                path: '',
                component: UserListComponent
            }
        ]
    }
];
