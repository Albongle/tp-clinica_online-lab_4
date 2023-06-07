import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { KeysNamesPipe } from 'src/app/pipes/keys-names.pipe';

@NgModule({
  declarations: [TableComponent, KeysNamesPipe],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
