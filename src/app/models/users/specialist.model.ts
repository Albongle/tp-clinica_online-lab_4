import { User, UserRole } from './user.model';

export class Specialist extends User {
  public verifiedByAdmin: boolean;
  public speciality: string;
  constructor(params: {
    name: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    speciality: string;
  }) {
    super(params, UserRole.ESPECILIST);
    this.speciality = params.speciality;
    this.verifiedByAdmin = false;
  }
}
