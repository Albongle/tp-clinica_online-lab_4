import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClinicHistory } from 'src/app/models/clinic_history.model';
import { ClinicHistoryService } from 'src/app/services/clinic_history.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss'],
})
export class ClinicHistoryComponent {
  protected listOfClinicHistory: ClinicHistory[];
  @Output() public eventReturnToHome: EventEmitter<boolean>;
  @Input() public showClinicHistory: boolean;
  constructor(
    protected readonly userService: UserService,
    private readonly clinicHistoryService: ClinicHistoryService
  ) {
    this.setListClinicalHistory();
    this.eventReturnToHome = new EventEmitter();
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
    } else if (this.userService.userLogged?.userRole === 'specialist') {
      this.listOfClinicHistory = (
        await this.clinicHistoryService.getAllClinicHistory()
      ).filter(
        (clinicHistory) =>
          clinicHistory.appoinment.specialist.email ===
          this.userService.userLogged?.email
      );
    } else {
      this.listOfClinicHistory =
        await this.clinicHistoryService.getAllClinicHistory();
    }
  }
  protected returnToHome() {
    this.showClinicHistory = !this.showClinicHistory;
    this.eventReturnToHome.emit(this.showClinicHistory);
  }
}
