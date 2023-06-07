import { User, UserRole } from './user.model';

export class Patient extends User {
  public socialWork: string;
  constructor(params: {
    name: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    socialWork: string;
  }) {
    super(params, UserRole.PATIENT);
    this.socialWork = params.socialWork;
  }
}
