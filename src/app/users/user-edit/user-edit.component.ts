import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Models
import { User } from 'src/app/models/user.model';

// Services
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnChanges {

  @Input() public visible;
  @Input() public user: User;
  @Output() public add = new EventEmitter<any>();
  @Output() public delete = new EventEmitter<any>();
  @Output() public openClosePopUp = new EventEmitter<any>();
  public usr: User;
  // tslint:disable-next-line:variable-name
  constructor(/* private route: ActivatedRoute, private _userService: UserService */) { }

  ngOnInit() {
    /* this.route.params.subscribe((params) => {
      const id = + params.id;
      if (id !== 0) {
        this._userService.get('http://jsonplaceholder.typicode.com/users').subscribe((result) => {
          this.usersList = result;
          if (result && result.length > 0) {
            this.user = this.usersList.find((usr) => usr.id === id);
            this.visible = true;
          }
        });
      } else {
        this.user = new User();
        this.visible = true;
      }
    }); */
  }

  ngOnChanges() {
    this.usr = this.user;

  }

  public isVisible(state: boolean) {
    this.openClosePopUp.emit(state);
  }

  public save(user: User) {
    this.add.emit(user);
  }

  public deletion(id: number) {
    this.delete.emit(id);
  }


}


