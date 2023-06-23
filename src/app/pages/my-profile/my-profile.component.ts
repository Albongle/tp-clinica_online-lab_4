import { Component } from '@angular/core';
import { ClinicHistory } from 'src/app/models/clinic_history.model';
import { User } from 'src/app/models/users/user.model';
import { ClinicHistoryService } from 'src/app/services/clinic_history.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
  protected profilePhoto: string | undefined;
  protected imgDefault;
  protected user: User;
  protected listOfClinicHistory: ClinicHistory[];
  protected date: string;
  protected showSchedule: boolean;
  protected showClinicalHistory: boolean;
  constructor(
    protected readonly userService: UserService,
    private readonly clinicHistoryService: ClinicHistoryService
  ) {
    this.setParamsFromUsserLogged();
    this.setListClinicalHistory();
    this.imgDefault = '../../../assets/images/user_default.png';
    const date = new Date();
    this.date = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  }

  private async setParamsFromUsserLogged() {
    this.profilePhoto = this.userService.userLogged?.profilePhoto;
    this.user = this.userService.userLogged!;
  }

  protected showFormSchedule() {
    this.showSchedule = true;
  }

  protected showPageClinicalHistory() {
    this.showClinicalHistory = true;
  }

  protected handlerUpdateScheduleView(showSchedule: boolean) {
    this.showSchedule = showSchedule;
  }
  protected handlerUpdateClinicHistoryView(showSchedule: boolean) {
    this.showClinicalHistory = showSchedule;
  }

  private async setListClinicalHistory() {
    if (this.userService.userLogged?.userRole === 'patient') {
      this.listOfClinicHistory = (
        await this.clinicHistoryService.getAllClinicHistory()
      ).filter(
        (clinicHistory) =>
          clinicHistory.appoinment.patient.email ===
          this.userService.userLogged?.email
      );
    }
  }
}
