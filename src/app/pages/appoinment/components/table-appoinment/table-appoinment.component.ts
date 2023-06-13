import { Component, Input } from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';

@Component({
  selector: 'app-table-appoinment',
  templateUrl: './table-appoinment.component.html',
  styleUrls: ['./table-appoinment.component.scss'],
})
export class TableAppoinmentComponent {
  @Input() public appoinmentList: Appoinment[];
}
