import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit, OnChanges {

  /* Input values from users-list parent component */
  @Input() public showMap: boolean;
  @Input() public latitude: any;
  @Input() public longitude: any;
  /* Output openCloseMapPopUp func from users-list parent component*/
  @Output() public openCloseMapPopUp = new EventEmitter<any>();
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
    this.openCloseMapPopUp.emit(state);
  }

}
