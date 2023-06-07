import { User, UserRole } from './user.model';

export class Especialist extends User {
  public verifiedByAdmin: boolean;
  public speciality: string;
  constructor(params: {
    name: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    profilePhoto: string;
    speciality: string;
  }) {
    super(params, UserRole.ESPECILIST);
    this.speciality = params.speciality;
  }
}
