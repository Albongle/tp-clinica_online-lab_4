import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { KeysMappedPipe } from 'src/app/pipes/keys-names.pipe';

@NgModule({
  declarations: [MyProfileComponent, KeysMappedPipe],
  imports: [CommonModule, MyProfileRoutingModule],
})
export class MyProfileModule {}
