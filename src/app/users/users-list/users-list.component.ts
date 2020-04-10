import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../../models/user.model';

// Services
import { UserService } from '../../services/users.service';


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
  private _usersListFilter: string;
  private _url: string = 'http://jsonplaceholder.typicode.com/users';

  get usersListFilter(): string {
    return this._usersListFilter;
  }

  set usersListFilter(value: string) {
    this._usersListFilter = value;
     this.usersList= this._usersListFilter ? this.getfiltered (this.usersListFilter) : this.usersList;
    this.userCount = this.filteredUsersList.length;
  } 

  constructor(private _userService: UserService) { }

  ngOnInit() {

    this.getRequestResults();
  }


  public getRequestResults(): void {
    this.usersListFilter; 
    this._userService.get(this._url).subscribe((result) => {
      this.filteredUsersList = this.usersList = result;
      this.userCount = this.usersList.length;
    });
  }

  private getfiltered (filterList: string): User[] {
    filterList = filterList.toLocaleLowerCase();
    return this.usersList.filter((user: User) => {
      return user.name.toLocaleLowerCase().includes(filterList);
    });
  } 

  /* private getfiltered(filterList: string): User[] {
    filterList = filterList.toLocaleLowerCase();
    return this.usersList.filter((user: User) => {
      user.name.toLocaleLowerCase().includes(filterList)
      if (this.usersList && this.usersList.length >0) {
        return this.usersList;;
      } else {
        return this.getRequestResults();
      }

    });
  } */

  public getUser(id: number) {
    if (id === 0) {
      this.userClone = new User();

    } else {
      this.user = this.filteredUsersList.find((usr) => usr.id === id);
      this.userClone = JSON.parse(JSON.stringify(this.user));
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
      /* user.id = Math.max.apply(Math, this.usersList.map((o) => { return o.y; })) */
      user.id = this.usersList.length + 1;
      if (this.filteredUsersList.length !== this.usersList.length) {
        this.filteredUsersList.push(user);
        this.usersList.push(user);
      } else {
        this.usersList.push(user);
      }
      this.userCount = this.filteredUsersList.length;
    } else {
      const index = this.filteredUsersList.findIndex(usr => usr.id === user.id);
      this.filteredUsersList[index] = user;
    }
    this.visible = false;
  }

  public delete(id) {
    const index = this.filteredUsersList.findIndex(usr => usr.id === id);
    const indx = this.usersList.findIndex(usr => usr.id === id);
    if (index > -1) {
      this.filteredUsersList.splice(index, 1);
      this.usersList.splice(indx, 1);
      this.userCount = this.filteredUsersList.length;
    }
    this.visible = false;

  }
}
