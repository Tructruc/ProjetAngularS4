import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../models/exercise";
import {Router} from "@angular/router";
import {Exerciseervice} from "../../services/exercise.service";
import {Status} from "../../models/routine";

@Component({
  selector: 'app-exercises-item',
  templateUrl: './exercises-item.component.html',
  styleUrl: './exercises-item.component.scss'
})
export class ExercisesItemComponent implements OnInit{
  @Input()
  public exercise: Exercise = new Exercise();
  public done: boolean = false;

  constructor(private exerciseService: Exerciseervice, private router: Router) {
  }

  ngOnInit(): void {
    this.done = this.exerciseService.getExerciseStatus(this.exercise.id);
  }


  deleteExercise(exercise: Exercise) {
    if (confirm("Voulez vous réellement supprimer l'exercice " + this.exercise.name)){
      this.exerciseService.deleteExercise(this.exercise)
    }
  }

  protected readonly status = Status;

  onDo() {
    this.exerciseService.setExerciseStatus(this.exercise.id, !this.done);
    this.done = this.exerciseService.getExerciseStatus(this.exercise.id);
  }
}
