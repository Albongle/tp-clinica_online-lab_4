import { User, UserRole } from './user.model';

export class Admin extends User {
  constructor(params: {
    userId: string;
    name: string;
    lastName: string;
    age: number;
    email: string;
    verified: boolean;
    password: string;
    profilePhoto: string;
  }) {
    super(params, UserRole.ADMIN);
  }
}
