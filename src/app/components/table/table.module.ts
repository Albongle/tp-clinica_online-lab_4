import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { KeysMappedPipe } from 'src/app/pipes/keys-names.pipe';

@NgModule({
  declarations: [TableComponent, KeysMappedPipe],
  imports: [CommonModule],
  exports: [TableComponent],
})
export class TableModule {}
