import {Component, Input} from '@angular/core';
import {Exercise} from "../../models/exercise";
import {Router} from "@angular/router";
import {Exerciseervice} from "../../services/exercise.service";

@Component({
  selector: 'app-exercises-item',
  templateUrl: './exercises-item.component.html',
  styleUrl: './exercises-item.component.scss'
})
export class ExercisesItemComponent {
  @Input()
  public exercise: Exercise = new Exercise();

  constructor(private exerciseService: Exerciseervice, private router: Router) {
  }


  deleteExercise(exercise: Exercise) {
    if (confirm("Voulez vous réellement supprimer l'exercice " + this.exercise.name)){
      this.exerciseService.deleteExercise(this.exercise)
    }
  }
}
