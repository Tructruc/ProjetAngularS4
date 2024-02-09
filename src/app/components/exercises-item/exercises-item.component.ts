import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../models/exercise";
import {Router} from "@angular/router";
import {Exerciseervice} from "../../services/exercise.service";
import {Status} from "../../models/routine";
import {ExerciseTypeService} from "../../services/exercise-type.service";
import {ExerciseType} from "../../models/exercise-type";

@Component({
  selector: 'app-exercises-item',
  templateUrl: './exercises-item.component.html',
  styleUrl: './exercises-item.component.scss'
})
export class ExercisesItemComponent implements OnInit{
  @Input()
  public exercise: Exercise = new Exercise();
  public done: boolean = false;

  @Input()
  public exerciseTypes: ExerciseType[] = [];

  @Input()
  public finishedFilter: string = "all";

  public showImage: boolean = false;
  public imagePath: string = "";
  //../../../assets/img-fitness/{{exercise.name.toLowerCase().replaceAll(' ', '-')}}.webp

  constructor(private exerciseService: Exerciseervice){
  }

  ngOnInit(): void {
    this.done = this.exerciseService.getExerciseStatus(this.exercise.id);

    this.exerciseTypes.forEach(exerciseType => {
      if (this.exercise.name.includes(exerciseType.name)) {
        this.imagePath = "../../../assets/img-fitness/" + exerciseType.name.toLowerCase().replaceAll(' ', '-') + ".webp";
      }
    })
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

  onToggleImage() {
    this.showImage = !this.showImage;
  }
}
