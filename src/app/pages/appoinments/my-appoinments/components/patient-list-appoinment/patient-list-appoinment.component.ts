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
  selector: 'app-patient-list-appoinment',
  templateUrl: './patient-list-appoinment.component.html',
  styleUrls: ['./patient-list-appoinment.component.scss'],
})
export class PatientListAppoinmentComponent implements OnChanges {
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
    if (this.userEmail) {
      this.listOfAppoinments = (
        await this.appointmentService.getAllAppoinment()
      ).filter((appoinment) => appoinment.patient.email === this.userEmail);
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
