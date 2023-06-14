import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DaysOfWeek } from 'src/app/models/schedule.model';
import { Patient } from 'src/app/models/users/patient.model';
import { Specialist } from 'src/app/models/users/specialist.model';
import { AlertService } from 'src/app/services/alert.service';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-appoinment',
  templateUrl: './create-appoinment.component.html',
  styleUrls: ['./create-appoinment.component.scss'],
})
export class CreateAppoinmentComponent {
  protected showSpecialities: boolean;
  protected showSpecialist: boolean;
  protected showDates: boolean;
  protected showTimes: boolean;

  protected availableSchedule: any[];
  protected listOfSpecialities: string[];
  protected listOfSpecialist: Specialist[];
  protected listOfPatients: Patient[];
  protected listOfSpecialistsAvailable: Specialist[];

  protected chosenSpecialist: Specialist;

  constructor(
    protected readonly userService: UserService,
    private readonly specialitiesService: SpecialitiesService,
    private readonly alertService: AlertService,
    private readonly appoinmentService: AppoinmentService,
    private readonly formBuilder: FormBuilder
  ) {
    this.availableSchedule = [];
    this.showSpecialities = true;
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
    this.listOfPatients = users.filter(
      (user) => user.userRole === 'patient'
    ) as Patient[];
  }

  protected async selectSpeciality(specialitie: string) {
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
  }

  protected chooseSpecialist(specialist: Specialist) {
    this.chosenSpecialist = specialist;

    if (this.chosenSpecialist.speciality.schedule.days) {
      this.setAvailableDays();
      this.availableSchedule = this.availableSchedule.filter((dayAvailable) =>
        this.chosenSpecialist.speciality.schedule.days.some(
          (daySchedule) =>
            daySchedule.day == (dayAvailable.weekDay as DaysOfWeek)
        )
      );
    } else {
      console.log('Sin planificacion');
    }
  }

  private setAvailableDays() {
    const today = new Date();
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 15);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    while (today <= nextDate) {
      const obj: any = {};
      const weekDay = today.toLocaleDateString('es-ES', options);
      obj.weekDay = weekDay;
      obj.message = `${weekDay} - ${today.toLocaleDateString()}`;
      this.availableSchedule.push(obj);
      today.setDate(today.getDate() + 1);
    }
    console.log(this.availableSchedule);
  }

  protected returnToSpecialities() {}

  protected returnToSpecialist() {}

  protected returnToDate() {}

  protected create() {}
}
