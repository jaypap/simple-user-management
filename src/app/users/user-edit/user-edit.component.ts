import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Models
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnChanges {

  /* Input values from users-list parent component */
  @Input() public visible;
  @Input() public user: User;
  @Output() public add = new EventEmitter<any>();
  @Output() public delete = new EventEmitter<any>();
  /* Output openClosePopUp func from users-list parent component*/
  @Output() public openClosePopUp = new EventEmitter<any>();
  public usr: User;

  constructor() { }

  /* initialize component */
  ngOnInit() {

  }

  /* checks for changes */
  ngOnChanges() {

  }

  /* open-close pop-up - updates users-list parent component
   * @params state boolean true/false
  */
  public isVisible(state: boolean) {
    this.openClosePopUp.emit(state);
  }


  /* add new/edit user - updates users-list parent component 
  *  @params user obj
  */
  public save(user: User) {
    this.add.emit(user);
  }

  /* delete user - updates users-list parent component 
  *  @params user obj
  */
  public deletion(id: number) {
    this.delete.emit(id);
  }


}


