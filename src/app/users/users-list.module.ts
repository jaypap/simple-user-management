import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components

import { UserListComponent } from './users-list.component';
import { UserService } from '../services/users.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { usersRoutes } from './users.routes';
import { RouterModule } from '@angular/router';


export const myDeclarations = [UserListComponent, UserEditComponent];

export const myImports = [
    CommonModule,
    FormsModule,
    RouterModule.forChild(usersRoutes),
];

export const myProviders = [UserService];

@NgModule({

    declarations: [
        ...myDeclarations,

    ],
    imports: [
        ...myImports
    ],
    providers: [...myProviders]
})
export class UserModule { }
