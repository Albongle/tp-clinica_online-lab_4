import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotimageUserDirective } from './not-image-user.directive';
import { UsersMouseEnterDirective } from './users-over.directive';
import { ShadowDirective } from './shadow.directive';
@NgModule({
  declarations: [
    NotimageUserDirective,
    UsersMouseEnterDirective,
    ShadowDirective,
  ],
  imports: [CommonModule],
  exports: [NotimageUserDirective, UsersMouseEnterDirective, ShadowDirective],
})
export class PersonalDirectivesModule {}
