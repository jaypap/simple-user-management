import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit, OnChanges {


  @Input() public showMap: boolean;
  @Input() public latitude: any;
  @Input() public longitude: any;
  @Output() public openCloseMapPopUp = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  public isVisible(state: boolean) {
    this.openCloseMapPopUp.emit(state);
  }

}
