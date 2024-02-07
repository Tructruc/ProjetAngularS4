import {Component, Input} from '@angular/core';
import {Routine, Status} from '../../models/routine';
import {RoutineService} from "../../services/routine.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-routine-item',
  templateUrl: './routine-item.component.html',
  styleUrl: './routine-item.component.scss'
})
export class RoutineItemComponent {
  @Input() public routine: Routine = new Routine();
  readonly  status = Status;
  @Input() statusFilter!: string;

  constructor(private routineService: RoutineService) {
  }


  deleteRoutine() {
    if (confirm("Voulez vous réellement supprimer la routine " + this.routine.name)){
      this.routineService.deleteRoutine(this.routine);
    }

  }

  onActivate() {
    if (this.routine.status === Status.ACTIVE) {
      this.routine.status = Status.INACTIVE;
    } else{
      this.routine.status = Status.ACTIVE;
    }
    this.routineService.updateRoutine(this.routine).subscribe();
  }
}
