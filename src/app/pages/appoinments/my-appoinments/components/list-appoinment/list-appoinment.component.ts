import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';

@Component({
  selector: 'app-list-appoinment',
  templateUrl: './list-appoinment.component.html',
  styleUrls: ['./list-appoinment.component.scss'],
})
export class ListAppoinmentComponent {
  @Input() public userRole: string;
  @Input() public listOfAppoinments: Appoinment[];
  @Output() public eventChooseAppoinment: EventEmitter<Appoinment>;
  @Output() public eventFilterTable: EventEmitter<string>;

  constructor() {
    this.eventChooseAppoinment = new EventEmitter();
    this.eventFilterTable = new EventEmitter();
  }

  protected chooseAppoinment(appoinment: Appoinment) {
    this.eventChooseAppoinment.emit(appoinment);
  }

  protected searchAppoinment($event: Event) {
    const input = $event.target as HTMLInputElement;
    const textInput = input.value;

    this.eventFilterTable.emit(textInput);
  }
}
