import { User } from './users/user.model';

export class Log {
  public id: string;
  public user: User;
  public date: string;

  constructor(user: User) {
    this.user = user;
    const date = new Date();
    this.date = `${date.toLocaleDateString()}`;
  }
}
