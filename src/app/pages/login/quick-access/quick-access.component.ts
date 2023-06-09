import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/users/user.model';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
})
export class QuickAccessComponent {
  @Input() public listUsers: User[];
  @Output() public evenQuickAccessUser: EventEmitter<User>;

  constructor() {
    this.evenQuickAccessUser = new EventEmitter();
  }

  protected setUser($event: Event, user: User) {
    $event.preventDefault();
    this.evenQuickAccessUser.emit(user);
  }
}
