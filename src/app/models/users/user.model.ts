export enum UserRole {
  ADMIN = 'admin',
  ESPECILIST = 'specialist',
  PATIENT = 'patient',
}

export class User {
  public userId: string;
  public verified: boolean;
  public userRole: UserRole;
  public name: string;
  public lastName: string;
  public age: number;
  public email: string;
  public password: string;

  constructor(
    params: {
      name: string;
      lastName: string;
      age: number;
      email: string;
      password: string;
    },
    userRole: UserRole
  ) {
    this.age = params.age;
    this.email = params.email;
    this.lastName = params.lastName;
    this.name = params.name;
    this.password = params.password;

    this.userRole = userRole;
  }
}
