import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Day, DaysOfWeek, Schedule } from 'src/app/models/schedule.model';
import { Specialist } from 'src/app/models/users/specialist.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss'],
})
export class ManageScheduleComponent {
  @Input() public showSchedule: boolean;
  @Output() public eventShowSchedule: EventEmitter<boolean>;
  protected schedule: Schedule;
  protected possibleDaysOfWeek: DaysOfWeek[];
  protected possibleTimes: number[];
  protected formSchedule: FormGroup;
  protected selectedDays: DaysOfWeek[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly alertService: AlertService
  ) {
    this.selectedDays = [];
    this.eventShowSchedule = new EventEmitter();
    this.schedule = new Schedule();
    this.possibleDaysOfWeek = [
      DaysOfWeek.Lunes,
      DaysOfWeek.Martes,
      DaysOfWeek.Miercoles,
      DaysOfWeek.Jueves,
      DaysOfWeek.Viernes,
      DaysOfWeek.Sabado,
      DaysOfWeek.Domingo,
    ];
    this.possibleTimes = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 29, 20,
      21, 22, 23,
    ];
    this.formSchedule = this.formBuilder.group({
      days: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
    });
  }

  protected return() {
    this.showSchedule = !this.showSchedule;
    this.eventShowSchedule.emit(this.showSchedule);
  }

  protected selectDay($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (input.checked) {
      this.selectedDays.push(input.value as DaysOfWeek);
    } else {
      const index = this.selectedDays.findIndex((d) => d === input.value);
      if (index > -1) {
        this.selectedDays.splice(index, 1);
      }
    }

    if (this.selectedDays.length === 0) {
      this.formSchedule.controls['days'].reset();
    }
  }

  protected async register() {
    if (this.formSchedule.valid) {
      try {
        this.timeValidator();
        this.schedule.days = this.selectedDays.map((day) => {
          const newDay = new Day();
          newDay.dayOfWeek = day;
          newDay.timeStart = this.formSchedule.value.timeStart;
          newDay.timeEnd = this.formSchedule.value.timeEnd;

          return newDay;
        });
        const user = this.userService.userLogged as Specialist;
        user.speciality.schedule = this.schedule;
        await this.userService.saveUserWithIdInStore(user.userId, user);
        await this.alertService.showAlert({
          icon: 'success',
          message: 'Planificacion cargada con exito',
          timer: 2000,
        });

        this.formSchedule.reset();
      } catch (error: any) {
        await this.alertService.showAlert({
          icon: 'error',
          message: error.message,
          timer: 2000,
        });
      }
    } else {
      await this.alertService.showAlert({
        icon: 'error',
        message: 'Debe completar las opciones',
        timer: 2000,
      });
    }
  }

  private timeValidator() {
    if (
      parseInt(this.formSchedule.value.timeStart) >
      parseInt(this.formSchedule.value.timeEnd)
    ) {
      throw new Error('La hora de fin no puede ser mayor que la de inicio');
    }
  }
}
