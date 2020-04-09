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
  public filteredUsersList: User[];
  public user: User;
  public userClone: User;
  public userCount: number;
  public visible: boolean;
  // tslint:disable-next-line:variable-name
  private _usersListFilter: string;

  get usersListFilter(): string {
    return this._usersListFilter;
  }

  set usersListFilter(value: string) {
    this._usersListFilter = value;
    this.filteredUsersList =  this._usersListFilter ? this.performFilter(this.usersListFilter) : this.usersList;
    this.userCount = this.filteredUsersList.length;
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
      this.filteredUsersList = this.usersList;
      this.userCount = this.usersList.length;
    });
  }

  private performFilter(filterList: string): User[] {
    filterList = filterList.toLocaleLowerCase();
    return this.usersList.filter((user: User) => {
      // tslint:disable-next-line:no-unused-expression
      return user.name.toLocaleLowerCase().includes(filterList);
    });
  }

  public getUser(id: number) {
    if (id === 0) {
      this.userClone = this.user = new User();

    } else {
      this.user = this.filteredUsersList.find((usr) => usr.id === id);
      this.userClone = Object.assign({}, this.user);
    }
    if (this.userClone !== null && this.userClone !== undefined) {
      this.openClosePopUp(true);
    }
  }

  public openClosePopUp(isVisible) {
    this.visible = isVisible;
  }

  public add(user: User) {
    if (user.id === 0) {
      user.id = this.usersList.length + 1;
      this.filteredUsersList.length !== this.usersList.length ? this.filteredUsersList.push(user) : this.usersList.push(user);
      /*  this.filteredUsersList.push(user);
     this.usersList.push(user); */
      this.userCount = this.filteredUsersList.length;
    } else {
      const index = this.filteredUsersList.findIndex(usr => usr.id === user.id);
      this.filteredUsersList[index] = user;
    }
    this.visible = false;
  }

  public delete(id) {
    const index = this.filteredUsersList.findIndex(usr => usr.id === id);
    if (index > -1) {
      this.filteredUsersList.splice(index, 1);
      this.userCount = this.filteredUsersList.length;
    }
    this.visible = false;

  }
}
