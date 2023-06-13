export class Schedule {
  public days: Day[];
}
export enum DaysOfWeek {
  Lunes = 'Lunes',
  Martes = 'Martes',
  Miercoles = 'Miercoles',
  Jueves = 'Jueves',
  Viernes = 'Viernes',
  Sabado = 'Sabado',
  Domingo = 'Domingo',
}

export class Day {
  public day: DaysOfWeek;
  public timeStart: number;
  public timeEnd: number;
}
