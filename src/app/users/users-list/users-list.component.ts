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
  public rowsCollapsed: false[] = new Array();
  public faIconShow: string = "plus";
  public latitude: string;
  public longitude: string;
  public lat: number = -23.8779431;
  public lng: number = -49.8046873;
  public showMap: boolean = false;
  private _usersListFilter: string;
  private _url: string = 'http://jsonplaceholder.typicode.com/users';

  get usersListFilter(): string {
    return this._usersListFilter;
  }

  set usersListFilter(value: string) {
    this._usersListFilter = value;
    this.filteredUsersList = this._usersListFilter ? this.getfiltered(this.usersListFilter) : this.usersList;
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

  public getUser(id: number) {
    if (id === 0) {
      this.userClone = new User();

    } else {
      this.user = this.filteredUsersList.find((usr) => usr.id === id);
      this.userClone = JSON.parse(JSON.stringify(this.user));
      this.latitude = this.user.geo.lat;
      this.longitude = this.user.geo.lng
    }
    if (this.userClone !== null && this.userClone !== undefined) {
      this.openClosePopUp(true);
    }
  }

  public openClosePopUp(isVisible: boolean) {
    this.visible = isVisible;
  }

  public openCloseMapPopUp(isVisible: boolean) {
    this.showMap = isVisible;
  }

  public openCloseRows(state: boolean) {
    state = !state;
    state === true ? this.faIconShow = "plus" : this.faIconShow = "minus";
  }

  public userCoordinates() {

    /* if (this.latitude !== null && this.latitude !== undefined && this.longitude !== null && this.latitude !== null) { */
      this.openCloseMapPopUp(true);
   /*  } */
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


  private getfiltered(filterList: string): User[] {
    filterList = filterList.toLocaleLowerCase();
    return this.usersList.filter((user: User) => {
      return user.name.toLocaleLowerCase().includes(filterList);
    });
  }
}
