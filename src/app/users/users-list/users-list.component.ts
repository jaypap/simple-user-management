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

  /* Properties */
  public usersList: User[];
  public filteredUsersList: User[];
  public user: User;
  public userClone: User;
  public visible: boolean;
  public rowsCollapsed: false[] = new Array();
  public faIconShow = 'plus';
  public latitude: number;
  public longitude: number;
  public showMap = false;

  private _usersListFilter = '';

  private readonly url = 'http://jsonplaceholder.typicode.com/users';

  get usersListFilter(): string {
    return this._usersListFilter;
  }
  /* inserted search-property to filter the users-list 
  *  if the filterd list is equal to the user list show all the users
  *  else show the filtered users
  */
  set usersListFilter(value: string) {
    this._usersListFilter = value;
    this.filteredUsersList = this._usersListFilter ? this.getfiltered(this.usersListFilter) : this.usersList;
  }
  /* inject the user service from user.service */
  constructor(private userService: UserService) { }

  /* initialize component get service */
  ngOnInit() {
    this.getRequestResults();
  }

  /* Find the user by his id
  * clone the user in order not to change in the DOM simultaneously 
  * while editing user because it is two-way binding 
  * Open user pop up
  * @params user id
  */
  public getUser(id: number): void {
    this.userClone = new User();

    if (id !== 0) {
      this.user = this.filteredUsersList.find((usr) => usr.id === id);
      this.userClone = JSON.parse(JSON.stringify(this.user));
    }

    if (this.userClone && this.userClone != null) {
      this.openClosePopUp(true);
    }
  }

  /* Opens and closes User pop up */
  public openClosePopUp(isVisible: boolean): void {
    this.visible = isVisible;
  }

  /* Opens and closes google Maps pop up */
  public openCloseMapPopUp(isVisible: boolean): void {
    this.showMap = isVisible;
  }

  /* find  users latitude and longitude  by his id 
  *  @params user id
  */
  public userCoordinates(id: number): void {
    const coordUser = this.filteredUsersList.find((usr) => usr.id === id);

    if (coordUser && coordUser != null) {
      if (coordUser.address.geo.lat && coordUser.address.geo.lat != null
        && coordUser.address.geo.lng && coordUser.address.geo.lng != null) {
        this.latitude = parseFloat(coordUser.address.geo.lat);
        this.longitude = parseFloat(coordUser.address.geo.lng);
        this.openCloseMapPopUp(true);
      }
    }

  }
  /* adds the user to users-list
  *  puts the user at the end of the list 
  *  by giving him the maximum id number +1(put at the end)
  *  show the filtered user list by calling the getFilterd func
  *  close user pop up
  *  @params user Obj
  */
  public add(user: User): void {
    if (user.id === 0) {
      user.id = Math.max.apply(Math, this.usersList.map((o) => o.id)) + 1;
      this.usersList.push(user);
      this.filteredUsersList = this.getfiltered(this.usersListFilter);
    } else {
      const index = this.filteredUsersList.findIndex(usr => usr.id === user.id);
      this.filteredUsersList[index] = user;
    }

    this.visible = false;
  }

  /*  Deletes user form users list  
  *   show the filtered user list by calling the getFilterd func 
  *   @paramns id
  */
  public delete(id): void {
    const index = this.usersList.findIndex(usr => usr.id === id);
    if (index > -1) {
      this.usersList.splice(index, 1);
      this.filteredUsersList = this.getfiltered(this.usersListFilter);
    }
    this.visible = false;
  }

  /* get user service with API url  */
  private getRequestResults(): void {
    this.userService.get(this.url).subscribe((result) => {
      this.filteredUsersList = this.usersList = result;
    });
  }

  /* filters the userlist with the insetred property
  *  checks if the insetred property is included in users' name
  *  @params filterList 
  */
  private getfiltered(filterList: string): User[] {
    return this.usersList.filter((user: User) => {
      return user.name.toLocaleLowerCase().includes(filterList.toLocaleLowerCase());
    });
  }
}
