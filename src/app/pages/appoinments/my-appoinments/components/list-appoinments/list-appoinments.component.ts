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
    } else {
      this.listOfAppoinments = [];
    }
  }

  protected chooseAppoinment(appoinment: Appoinment) {
    this.eventChooseAppoinment.emit(appoinment);
  }
}
