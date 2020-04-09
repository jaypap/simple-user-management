import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../models/user.model';

// Services
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UserListComponent implements OnInit {


  public usersList: User[];
  public filteredUsers: User[];
  public user: User;
  public userCount: number;
  public visible: boolean;
  // tslint:disable-next-line:variable-name
  private _usersListFilter: string;

  get usersListFilter(): string {
    return this._usersListFilter;
  }

  set usersListFilter(value: string) {
    this._usersListFilter = value;
    this.filteredUsers = value ? this.performFilter(this.usersListFilter) : this.usersList;
    this.userCount = this.filteredUsers.length;
  }
  // tslint:disable-next-line:variable-name
  constructor(private _userService: UserService) { }

  ngOnInit() {

    this.getRequestResults();
  }


  public getRequestResults(): void {
    // tslint:disable-next-line:no-unused-expression
    this.usersListFilter;
    this._userService.get('http://jsonplaceholder.typicode.com/users').subscribe((result) => {
      this.usersList = result;
      this.filteredUsers = this.usersList;
      this.userCount = this.usersList.length;
    });
  }

  private performFilter(filterBy: string): User[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.usersList.filter((user: User) => {
      // tslint:disable-next-line:no-unused-expression
      return user.name.toLocaleLowerCase().includes(filterBy);
    });
  }

  public userPopUp(id: number) {
    if (id === 0) {
      this.user = new User();
    } else {
      this.user = this.usersList.find((usr) => usr.id === id);
    }
    if (this.user !== null && this.user !== undefined) {
      this.openClosePopUp(true);
    }
  }

  public openClosePopUp(isVisible) {
    this.visible = isVisible;
  }

  public add(user: User) {
    if (user.id === 0) {
      this.user.id = this.filteredUsers.length + 1;
      this.filteredUsers.push(this.user);
      this.userCount = this.filteredUsers.length;
    } else {
      const index = this.filteredUsers.findIndex(usr => usr.id === user.id);
      this.filteredUsers[index] = user;
    }
    this.visible = false;
  }

  public delete(id) {
    const index = this.filteredUsers.findIndex(usr => usr.id === id);
    if (index > -1) {
      this.filteredUsers.splice(index, 1);
      this.userCount = this.filteredUsers.length;
    }
    this.visible = false;

  }
}
