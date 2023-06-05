import { User, UserRole } from './user.model';

export class Patient extends User {
  public socialWork: string;
  public profilePhotoTwo: string;
  /**
   *
   */
  constructor(params: {
    name: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    profilePhoto: string;
    profilePhotoTwo: string;
    socialWork: string;
  }) {
    super(params, UserRole.PATIENT);
    this.profilePhotoTwo = params.profilePhotoTwo;
    this.socialWork = params.socialWork;
  }
}
