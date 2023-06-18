import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appoinment, AppoinmentState } from 'src/app/models/appoinment.model';

@Component({
  selector: 'app-list-appoinment',
  templateUrl: './list-appoinment.component.html',
  styleUrls: ['./list-appoinment.component.scss'],
})
export class ListAppoinmentComponent {
  @Input() public userRole: string;
  @Input() public listOfAppoinments: Appoinment[];
  @Output() public eventChooseAppoinment: EventEmitter<Appoinment>;
  @Output() public eventAcceptedAppoinment: EventEmitter<AppoinmentState>;
  @Output() public eventFilterTable: EventEmitter<string>;
  private appoinmentSelected: Appoinment;
  constructor() {
    this.eventChooseAppoinment = new EventEmitter();
    this.eventFilterTable = new EventEmitter();
    this.eventAcceptedAppoinment = new EventEmitter();
  }

  protected chooseAppoinment(appoinment: Appoinment) {
    this.appoinmentSelected = appoinment;
    this.eventChooseAppoinment.emit(appoinment);
  }

  protected searchAppoinment($event: Event) {
    const input = $event.target as HTMLInputElement;
    const textInput = input.value;

    this.eventFilterTable.emit(textInput);
  }

  protected acceptedAppoinment(state: AppoinmentState) {
    this.eventAcceptedAppoinment.emit(state);
    this.eventChooseAppoinment.emit(this.appoinmentSelected);
  }
}
