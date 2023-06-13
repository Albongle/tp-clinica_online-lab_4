export class Schedule {
  public days: Day[];
}
export enum DaysOfWeek {
  Lunes = 0,
  Martes = 1,
  Miercoles = 2,
  Jueves = 3,
  Viernes = 4,
  Sabado = 5,
  Domingo = 6,
}

export class Day {
  public day: DaysOfWeek;
  public timeStart: number;
  public timeEnd: number;
}
