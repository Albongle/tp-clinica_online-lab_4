export class Schedule {
  public days: Day[];
}
export enum DaysOfWeek {
  Lunes = 'lunes',
  Martes = 'martes',
  Miercoles = 'miércoles',
  Jueves = 'jueves',
  Viernes = 'viernes',
  Sabado = 'sábado',
  Domingo = 'domingo',
}

export class Day {
  public day: DaysOfWeek;
  public timeStart: number;
  public timeEnd: number;
}
