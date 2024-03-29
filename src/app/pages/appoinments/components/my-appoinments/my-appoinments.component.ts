import { Component, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';
import {
  Appoinment,
  AppoinmentCalification,
  AppoinmentState,
} from 'src/app/models/appoinment.model';
import { ClinicHistory } from 'src/app/models/clinic_history.model';
import { Survey } from 'src/app/models/survey.model';
import { AlertService } from 'src/app/services/alert.service';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { ClinicHistoryService } from 'src/app/services/clinic_history.service';
import { UserService } from 'src/app/services/user.service';
import { slideInAnimation } from 'src/app/animations/animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-my-appoinments',
  templateUrl: './my-appoinments.component.html',
  styleUrls: ['./my-appoinments.component.scss'],
  animations: [slideInAnimation],
})
export class MyAppoinmentsComponent implements OnDestroy {
  protected appoinmentSelected: Appoinment | undefined;
  protected loading: boolean;
  protected reason: string | undefined;
  protected calification: AppoinmentCalification;
  protected listOfAppoinments: Appoinment[];
  private listOfAppoinmentsBackUp: Appoinment[];
  private listOfClinicHistory: ClinicHistory[];
  private appoinmentsSubcription: Subscription;
  protected acctionOnAppoinment: string | undefined;

  constructor(
    protected readonly userService: UserService,
    private readonly appointmentService: AppoinmentService,
    private readonly clinicHistoryService: ClinicHistoryService,
    private readonly alertService: AlertService,
    private readonly contexts: ChildrenOutletContexts
  ) {
    this.loading = true;
    this.setAppoinments();
    this.setClinicHistory();
  }
  ngOnDestroy(): void {
    this.appoinmentsSubcription.unsubscribe();
  }

  private async setAppoinments() {
    this.appoinmentsSubcription = this.appointmentService
      .getAllAppoinment()
      .pipe(map((data) => data as Appoinment[]))
      .subscribe((appoinments: Appoinment[]) => {
        setTimeout(() => {
          if (this.userService.userLogged?.userRole === 'patient') {
            this.listOfAppoinments = appoinments.filter(
              (appoinment: Appoinment) =>
                appoinment.patient.email === this.userService.userLogged?.email
            );
          } else if (this.userService.userLogged?.userRole === 'specialist') {
            this.listOfAppoinments = appoinments.filter(
              (appoinment: Appoinment) =>
                appoinment.specialist.email ===
                this.userService.userLogged?.email
            );
          } else {
            this.listOfAppoinments = appoinments;
          }
          this.listOfAppoinmentsBackUp = [...this.listOfAppoinments];
          this.loading = false;
        }, 2000);
      });
  }

  private async setClinicHistory() {
    this.listOfClinicHistory =
      await this.clinicHistoryService.getAllClinicHistory();
  }

  protected handlerChooseAppoinment(appoinment: Appoinment) {
    this.appoinmentSelected = appoinment;
  }

  protected searchAppoinment(value: string) {
    if (this.userService.userLogged?.userRole === 'patient') {
      this.listOfAppoinments = this.listOfAppoinmentsBackUp.filter(
        (appoinment) =>
          appoinment.specialist.name
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          appoinment.specialist.lastName
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          appoinment.specialist.speciality.description
            .toLowerCase()
            .includes(value.toLowerCase())
      );
    } else {
      this.listOfAppoinments = this.listOfAppoinmentsBackUp.filter(
        (appoinment) =>
          appoinment.patient.name.toLowerCase().includes(value.toLowerCase()) ||
          appoinment.patient.lastName
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          appoinment.specialist.speciality.description
            .toLowerCase()
            .includes(value.toLowerCase())
      );
    }

    if (this.listOfAppoinments.length === 0) {
      this.listOfAppoinments = this.listOfClinicHistory
        .filter((clinicHistory) => {
          const values = Object.values(clinicHistory);
          if (clinicHistory.data) {
            clinicHistory.data.forEach((d) => {
              values.push(...Object.values(d));
            });
          }
          return values.some(
            (v) => v.toString().toLowerCase() === value.toLowerCase()
          );
        })
        .map((clinicHistory) => clinicHistory.appoinment);
    }
  }

  protected async cancelAppoinment() {
    await this.updateStateAppoinment('cancel', false);
  }

  protected async completeAppoinment() {
    await this.updateStateAppoinment('complete', false);
  }

  protected async qualify() {
    const result = await this.alertService.showAlert({
      icon: 'question',
      message: `Confirma una calificacion de ${this.calification} estrellas en la atencion?`,
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      try {
        await this.appointmentService.saveAppoinmentWithIdInStore(
          this.appoinmentSelected?.id!,
          { ...this.appoinmentSelected!, calification: this.calification }
        );
        await this.alertService.showAlert({
          icon: 'success',
          message: 'Calificacion establecida con exito',
          timer: 2000,
        });
        this.appoinmentSelected = undefined;
        this.calification = undefined;
      } catch (error: any) {
        await this.alertService.showAlert({
          icon: 'error',
          message: error.message,
          timer: 2000,
        });
      }
    } else {
      this.calification = undefined;
    }
  }

  protected async handlerSurvey(survey: Survey) {
    try {
      await this.appointmentService.saveAppoinmentWithIdInStore(
        this.appoinmentSelected?.id!,
        { ...this.appoinmentSelected!, survey }
      );
      this.appoinmentSelected = undefined;
    } catch (error: any) {
      await this.alertService.showAlert({
        icon: 'error',
        message: error.message,
        timer: 2000,
      });
    }
  }

  private async updateStateAppoinment(
    state: AppoinmentState,
    notRequireReason: boolean
  ) {
    if (notRequireReason || this.reason) {
      try {
        await this.appointmentService.saveAppoinmentWithIdInStore(
          this.appoinmentSelected?.id!,
          {
            ...this.appoinmentSelected!,
            state: state,
            review: this.reason,
          }
        );
        await this.alertService.showAlert({
          icon: 'success',
          message: 'Turno modificado con exito',
          timer: 2000,
        });
        this.appoinmentSelected = undefined;
      } catch (error: any) {
        await this.alertService.showAlert({
          icon: 'error',
          message: error.message,
          timer: 2000,
        });
      }

      this.reason = undefined;
    } else {
      await this.alertService.showAlert({
        icon: 'error',
        message: 'Debe dejar una reseña al momento modificar el turno',
        timer: 2000,
      });
    }
  }

  protected async aceptedAppoinment(state: AppoinmentState) {
    await this.updateStateAppoinment(state, true);
  }

  protected async handlerClinicHistory(clinicHistory: ClinicHistory) {
    try {
      clinicHistory.appoinment = this.appoinmentSelected!;
      await this.clinicHistoryService.saveClinicHistoryInStore(clinicHistory);
      await this.appointmentService.saveAppoinmentWithIdInStore(
        this.appoinmentSelected?.id!,
        { ...this.appoinmentSelected!, hasClinicHistory: true }
      );
      await this.alertService.showAlert({
        icon: 'success',
        message: 'Historial almacendado con exito',
        timer: 2000,
      });
      this.appoinmentSelected = undefined;
    } catch (error: any) {
      await this.alertService.showAlert({
        icon: 'error',
        message: error.message,
        timer: 2000,
      });
    }
  }

  protected getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
