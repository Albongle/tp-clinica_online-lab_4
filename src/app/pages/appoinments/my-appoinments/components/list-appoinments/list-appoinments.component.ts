import { Component, Input } from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-appoinments',
  templateUrl: './list-appoinments.component.html',
  styleUrls: ['./list-appoinments.component.scss'],
})
export class ListAppoinmentsComponent {
  protected listOfAppoinments: Appoinment[];

  constructor(
    private readonly appointmentService: AppoinmentService,
    private readonly userService: UserService
  ) {
    this.setAppoinments();
  }

  private async setAppoinments() {
    this.listOfAppoinments = await this.appointmentService.getAllAppoinment();
  }

  protected chooseAppoinment(appoinment: Appoinment) {
    console.log(appoinment);
  }
}
