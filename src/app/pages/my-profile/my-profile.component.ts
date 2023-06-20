import { Component } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
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
  protected date: string;
  protected showSchedule: boolean;
  protected showClinicalHistory: boolean;
  constructor(protected readonly userService: UserService) {
    this.setParamsFromUsserLogged();
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
}
