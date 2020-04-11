import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components

import { UserListComponent } from './users-list/users-list.component';
import { UserService } from '../services/users.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { usersRoutes } from './users.routes';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { UserLocationComponent } from './user-location/user-location.component';


export const myDeclarations = [UserListComponent, UserEditComponent];

export const myImports = [
    CommonModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDH9PBp-SJeMqozAP3gGGoRbGMR34juEjY'
      }),
    RouterModule.forChild(usersRoutes),
];

export const myProviders = [UserService];

@NgModule({

    declarations: [
        ...myDeclarations,
        UserLocationComponent,

    ],
    imports: [
        ...myImports
    ],
    providers: [...myProviders]
})
export class UserModule { }
