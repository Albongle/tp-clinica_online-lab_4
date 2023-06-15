import { Component } from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-appoinments',
  templateUrl: './my-appoinments.component.html',
  styleUrls: ['./my-appoinments.component.scss'],
})
export class MyAppoinmentsComponent {
  protected appoinmentSelected: Appoinment | undefined;
  protected loading: boolean;
  protected reason: string;
  protected listCalification: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  protected listOfAppoinments: Appoinment[];
  private listOfAppoinmentsBackUp: Appoinment[];

  constructor(
    protected readonly userService: UserService,
    private readonly appointmentService: AppoinmentService
  ) {
    this.loading = true;
    this.setAppoinments();
  }

  private async setAppoinments() {
    setTimeout(async () => {
      if (this.userService.userLogged?.userRole === 'patient') {
        this.listOfAppoinments = (
          await this.appointmentService.getAllAppoinment()
        ).filter(
          (appoinment) =>
            appoinment.patient.email === this.userService.userLogged?.email
        );
      } else if (this.userService.userLogged?.userRole === 'specialist') {
        this.listOfAppoinments = (
          await this.appointmentService.getAllAppoinment()
        ).filter(
          (appoinment) =>
            appoinment.specialist.email === this.userService.userLogged?.email
        );
      }
      this.loading = false;
      this.listOfAppoinmentsBackUp = [...this.listOfAppoinments];
    }, 2000);
  }

  protected handlerChooseAppoinment(appoinment: Appoinment) {
    this.appoinmentSelected = appoinment;
  }

  protected searchAppoinment(value: string) {
    if (this.userService.userLogged?.userRole === 'patient') {
      this.listOfAppoinments = this.listOfAppoinmentsBackUp.filter(
        (appoinment) =>
          appoinment.specialist.name.includes(value) ||
          appoinment.specialist.lastName.includes(value) ||
          appoinment.specialist.speciality.description.includes(value)
      );
    } else {
      this.listOfAppoinments = this.listOfAppoinmentsBackUp.filter(
        (appoinment) =>
          appoinment.patient.name.includes(value) ||
          appoinment.patient.lastName.includes(value) ||
          appoinment.specialist.speciality.description.includes(value)
      );
    }
  }

  protected cancelAppoinment() {
    console.log(this.reason);
  }
}
