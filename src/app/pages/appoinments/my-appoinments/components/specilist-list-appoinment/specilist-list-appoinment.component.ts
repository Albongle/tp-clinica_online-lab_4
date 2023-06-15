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
  selector: 'app-specilist-list-appoinment',
  templateUrl: './specilist-list-appoinment.component.html',
  styleUrls: ['./specilist-list-appoinment.component.scss'],
})
export class SpecilistListAppoinmentComponent implements OnChanges {
  protected listOfAppoinments: Appoinment[];
  private listOfAppoinmentsBackUp: Appoinment[];
  @Output() public eventChooseAppoinment: EventEmitter<Appoinment>;
  @Input() public userEmail: string;

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
      ).filter((appoinment) => appoinment.specialist.email === this.userEmail);
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
