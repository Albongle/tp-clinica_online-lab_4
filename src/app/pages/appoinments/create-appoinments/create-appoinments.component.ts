import { Component } from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';
import { Day, DaysOfWeek } from 'src/app/models/schedule.model';
import { Patient } from 'src/app/models/users/patient.model';
import { Specialist } from 'src/app/models/users/specialist.model';
import { AlertService } from 'src/app/services/alert.service';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { UserService } from 'src/app/services/user.service';
type Time = { timeStart: string; timeEnd: string };

@Component({
  selector: 'app-create-appoinments',
  templateUrl: './create-appoinments.component.html',
  styleUrls: ['./create-appoinments.component.scss'],
})
export class CreateAppoinmentsComponent {
  protected hiddenSpecialities: boolean;
  protected hiddenPatients: boolean;
  protected hiddenSpecialist: boolean;
  protected hiddenDates: boolean;
  protected hiddenTimes: boolean;

  protected listOfAvailablesDays: Day[];
  protected listOfAvailablesTimes: Time[];
  protected listOfSpecialities: string[];
  protected listOfSpecialist: Specialist[];
  protected listOfPatients: Patient[];
  protected listOfSpecialistsAvailable: Specialist[];

  protected chosenSpecialist: Specialist;
  protected chosenPatient: Patient;
  protected chosenDay: Day;
  protected chosenTime: Time;
  protected imgPatient: string;

  constructor(
    protected readonly userService: UserService,
    private readonly specialitiesService: SpecialitiesService,
    private readonly alertService: AlertService,
    private readonly appoinmentService: AppoinmentService
  ) {
    this.hiddenPatients = true;
    this.hiddenSpecialist = true;
    this.hiddenDates = true;
    this.hiddenTimes = true;
    this.listOfAvailablesDays = [];
    this.listOfAvailablesTimes = [];
    this.imgPatient = '../../../../../assets/images/appoinment/paciente.png';

    this.setSpecialist();
    this.setSpecialities();
    if (this.userService.userLogged?.userRole === 'admin') {
      this.setPatients();
    }
  }

  private async setSpecialist() {
    const users = await this.userService.getUsersFromStore();
    this.listOfSpecialist = users.filter(
      (user) => user.userRole === 'specialist'
    ) as Specialist[];
  }

  private async setSpecialities() {
    const specialities = await this.specialitiesService.getAllSpecialities();
    this.listOfSpecialities = specialities.map((s) => s.description);
  }

  private async setPatients() {
    const users = await this.userService.getUsersFromStore();
    const patients = users.filter(
      (user) => user.userRole === 'patient'
    ) as Patient[];
    const patientsMapped = await Promise.all(
      patients.map(async (u) => {
        u.profilePhoto = (await this.userService.getProfilePhoto(u)) as string;
        return u;
      })
    );
    this.listOfPatients = patientsMapped;
  }

  protected async chooseEspeciality(specialitie: string) {
    this.listOfSpecialistsAvailable = this.listOfSpecialist.filter(
      (specialist) =>
        specialist.speciality.description === specialitie &&
        specialist.verifiedByAdmin
    );

    const usersMapped = await Promise.all(
      this.listOfSpecialistsAvailable.map(async (u) => {
        u.profilePhoto = (await this.userService.getProfilePhoto(u)) as string;
        return u;
      })
    );

    this.listOfSpecialistsAvailable = usersMapped;
    if (this.userService.userLogged?.userRole === 'admin') {
      this.hiddenPatients = false;
    } else {
      this.hiddenSpecialist = false;
    }

    this.hiddenSpecialities = true;
  }

  protected async chooseSpecialist(specialist: Specialist) {
    this.chosenSpecialist = specialist;

    if (this.chosenSpecialist.speciality.schedule.days) {
      this.setAvailableDays();
      this.filterDaysAvailables();
      this.mappedDaysAvailable();
      this.hiddenDates = false;
      this.hiddenSpecialist = true;
    } else {
      await this.alertService.showAlert({
        icon: 'info',
        message: 'El especialista no dispone de agenda aun.',
        timer: 2000,
      });
    }
  }

  private setAvailableDays() {
    const today = new Date();
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 15);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    while (today <= nextDate) {
      const day: Day = new Day();
      const dayOfWeek = today.toLocaleDateString('es-ES', options);

      day.dayOfWeek = dayOfWeek as DaysOfWeek;
      day.date = today.toLocaleDateString();
      this.listOfAvailablesDays.push(day);
      today.setDate(today.getDate() + 1);
    }
  }

  private filterDaysAvailables() {
    this.listOfAvailablesDays = this.listOfAvailablesDays.filter(
      (dayAvailable) =>
        this.chosenSpecialist.speciality.schedule.days.some(
          (daySchedule) => daySchedule.dayOfWeek == dayAvailable.dayOfWeek
        )
    );
  }

  private mappedDaysAvailable() {
    this.listOfAvailablesDays = this.listOfAvailablesDays.map(
      (dayAvailable) => {
        const dayOfSpecialist =
          this.chosenSpecialist.speciality.schedule.days.find(
            (day) => day.dayOfWeek === dayAvailable.dayOfWeek
          );
        if (dayOfSpecialist) {
          dayAvailable.timeEnd = dayOfSpecialist?.timeEnd;
          dayAvailable.timeStart = dayOfSpecialist?.timeStart;
        }

        return dayAvailable;
      }
    );
  }

  private setAvailableTimes() {
    const times: Time[] = [];
    let { timeStart, timeEnd } = this.chosenDay;
    let timeStartInt = parseInt(timeStart);
    let timeEndInt = parseInt(timeEnd);
    while (timeStartInt < timeEndInt) {
      let minutesStart = 0;
      let minutesEnd = 60;
      while (minutesStart < minutesEnd) {
        const obj: any = {};
        obj.timeStart = `${timeStartInt}:${
          minutesStart === 0 ? '00' : minutesStart
        }`;
        obj.timeEnd = `${
          minutesStart + 15 === 60 ? timeStartInt + 1 : timeStartInt
        }:${minutesStart + 15 === 60 ? '00' : minutesStart + 15}`;
        minutesStart += 15;
        times.push(obj);
      }
      timeStartInt++;
    }
    this.listOfAvailablesTimes = times;
  }

  protected returnToSpecialities() {
    if (
      this.userService.userLogged?.userRole === 'admin' &&
      this.hiddenPatients
    ) {
      this.hiddenSpecialist = true;
      this.hiddenPatients = false;
    } else {
      this.hiddenSpecialist = true;
      this.hiddenSpecialities = false;
      this.hiddenPatients = true;
    }
  }

  protected returnToSpecialist() {
    this.hiddenDates = true;
    this.hiddenSpecialist = false;
  }

  protected returnToDate() {
    this.hiddenDates = false;
    this.hiddenTimes = true;
  }

  private async createAppoinment() {
    if (this.userService.userLogged?.userRole !== 'admin') {
      this.chosenPatient = this.userService.userLogged as Patient;
    }

    this.chosenDay.timeStart = this.chosenTime.timeStart;
    this.chosenDay.timeEnd = this.chosenTime.timeEnd;
    const appoinment = new Appoinment({
      day: this.chosenDay,
      patient: this.chosenPatient,
      specialist: this.chosenSpecialist,
      state: 'pending',
    });
    await this.confirmAppoinment(appoinment);
  }

  protected choosePatient(patient: Patient) {
    this.chosenPatient = patient;
    this.imgPatient = patient.profilePhoto;
  }

  protected chooseDay(day: Day) {
    this.chosenDay = day;
    this.setAvailableTimes();
    this.hiddenDates = true;
    this.hiddenTimes = false;
  }

  protected async chooseTime(time: Time) {
    this.chosenTime = time;
    await this.createAppoinment();
  }

  protected async confirmPatient() {
    if (this.chosenPatient) {
      this.hiddenPatients = true;
      this.hiddenSpecialist = false;
    } else {
      await this.alertService.showAlert({
        icon: 'warning',
        message: 'Debe selecionar un paciente antes de avanzar',
      });
    }
  }

  private async confirmAppoinment(appoinment: Appoinment) {
    const result = await this.alertService.showAlert({
      message: `Confirma turno con el doctor ${this.chosenSpecialist.name},${this.chosenSpecialist.lastName}\nEl dia ${this.chosenDay.date}\nEn el horario ${this.chosenTime.timeStart} `,
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (result.isConfirmed) {
      try {
        await this.appoinmentService.saveAppoinmenInStore(appoinment);
        await this.alertService.showAlert({
          icon: 'success',
          message: 'Turno confirmado',
          timer: 2000,
        });
      } catch (error: any) {
        await this.alertService.showAlert({
          icon: 'error',
          message: error.message,
          timer: 2000,
        });
      }
      this.hiddenSpecialities = false;
      this.hiddenTimes = true;
    }
  }
}
