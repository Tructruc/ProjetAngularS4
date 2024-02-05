import {Component, Input} from '@angular/core';
import {Routine, Status} from '../../models/routine';

@Component({
  selector: 'app-routine-item',
  templateUrl: './routine-item.component.html',
  styleUrl: './routine-item.component.scss'
})
export class RoutineItemComponent {
  @Input()
  public routine: Routine = new Routine();
  readonly  status = Status;


}
