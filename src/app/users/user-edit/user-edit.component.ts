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

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {

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


