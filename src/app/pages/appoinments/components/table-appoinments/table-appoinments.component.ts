import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appoinment, AppoinmentState } from 'src/app/models/appoinment.model';

@Component({
  selector: 'app-table-appoinments',
  templateUrl: './table-appoinments.component.html',
  styleUrls: ['./table-appoinments.component.scss'],
})
export class TableAppoinmentsComponent {
  @Input() public listOfAppoinments: any[];
  @Output() public eventSendSelectedElement: EventEmitter<Appoinment>;
  @Output() public eventSendState: EventEmitter<AppoinmentState>;

  constructor() {
    this.eventSendSelectedElement = new EventEmitter();
    this.eventSendState = new EventEmitter();
  }
  protected chooseElement(appoinment: any) {
    this.eventSendSelectedElement.emit(appoinment as Appoinment);
  }

  protected acceptedAppoinment(appoinment: any) {
    this.eventSendSelectedElement.emit(appoinment as Appoinment);
    this.eventSendState.emit('accepted' as AppoinmentState);
  }
}
