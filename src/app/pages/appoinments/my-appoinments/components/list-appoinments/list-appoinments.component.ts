import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';
import { AppoinmentService } from 'src/app/services/appoinment.service';

@Component({
  selector: 'app-list-appoinments',
  templateUrl: './list-appoinments.component.html',
  styleUrls: ['./list-appoinments.component.scss'],
})
export class ListAppoinmentsComponent implements OnChanges {
  protected listOfAppoinments: Appoinment[];
  private listOfAppoinmentsBackUp: Appoinment[];
  @Output() public eventChooseAppoinment: EventEmitter<Appoinment>;
  @Input() public userEmail: string;
  @Input() public userRole: string;

  constructor(private readonly appointmentService: AppoinmentService) {
    this.setAppoinments();
    this.eventChooseAppoinment = new EventEmitter();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setAppoinments();
  }

  private async setAppoinments() {
    if (this.userRole && this.userEmail) {
      if (this.userRole === 'patient') {
        this.listOfAppoinments = (
          await this.appointmentService.getAllAppoinment()
        ).filter((appoinment) => appoinment.patient.email === this.userEmail);
      } else if (this.userRole === 'specialist') {
        this.listOfAppoinments = (
          await this.appointmentService.getAllAppoinment()
        ).filter(
          (appoinment) => appoinment.specialist.email === this.userEmail
        );
      }
      this.listOfAppoinmentsBackUp = [...this.listOfAppoinments];
    } else {
      this.listOfAppoinments = [];
      this.listOfAppoinmentsBackUp = [];
    }
  }

  protected chooseAppoinment(appoinment: Appoinment) {
    this.eventChooseAppoinment.emit(appoinment);
  }

  protected searchAppoinment($event: Event) {
    const input = $event.target as HTMLInputElement;
    const textInput = input.value;

    this.listOfAppoinments = this.listOfAppoinmentsBackUp.filter(
      (appoinment) =>
        appoinment.specialist.name.includes(textInput) ||
        appoinment.specialist.lastName.includes(textInput) ||
        appoinment.specialist.speciality.description.includes(textInput)
    );
  }
}
