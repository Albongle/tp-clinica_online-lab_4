import { User, UserRole } from './user.model';

export class Admin extends User {
  constructor(params: {
    name: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    profilePhoto: string;
  }) {
    super(params, UserRole.ADMIN);
  }
}
