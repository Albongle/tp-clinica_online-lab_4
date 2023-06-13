import { Schedule } from './schedule.model';

export class Speciality {
  public description: string;
  public schedule: Schedule;
  constructor(specialitie: { description: string }) {
    this.description = specialitie.description;
    this.schedule = new Schedule();
  }
}
