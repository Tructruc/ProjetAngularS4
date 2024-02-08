import {Component, Input, OnInit} from '@angular/core';
import {Routine, Status} from '../../models/routine';
import {RoutineService} from "../../services/routine.service";
import {Router} from "@angular/router";
import {Exerciseervice} from "../../services/exercise.service";
import {Exercise} from "../../models/exercise";

@Component({
  selector: 'app-routine-item',
  templateUrl: './routine-item.component.html',
  styleUrl: './routine-item.component.scss'
})
export class RoutineItemComponent implements OnInit{
  @Input() public routine: Routine = new Routine();
  readonly  status = Status;
  @Input() statusFilter!: string;
  @Input() finishedFilter!: string;

  done = false;

  constructor(private routineService: RoutineService, private exerciseService: Exerciseervice) {
  }

  ngOnInit(): void {
    let exercises: Exercise[] = [];

    this.routineService.getAllExercises(this.routine.id).subscribe({
      next: data => {
        exercises = data;

        for (let exercise of exercises) {
          if (this.exerciseService.getExerciseStatus(exercise.id)){
            this.done = true;
          } else {
            this.done = false;
            break;
          }
        }
      }
    });



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
