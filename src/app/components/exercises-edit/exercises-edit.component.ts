import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Exerciseervice} from "../../services/exercise.service";
import {NgForm} from "@angular/forms";
import {Routine} from "../../models/routine";
import {RoutineService} from "../../services/routine.service";
import {Exercise} from "../../models/exercise";
import {ExerciseType} from "../../models/exercise-type";
import {ExerciseTypeService} from "../../services/exercise-type.service";

@Component({
  selector: 'app-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrl: './exercises-edit.component.scss'
})
export class ExercisesEditComponent implements OnInit {
  @Input() exercise: Exercise = new Exercise();
  private routineId: number = 0;
  public exercisesTypes: ExerciseType[] = [];

  constructor(private exercisesService: Exerciseervice,
              private routineService: RoutineService,
              private router: Router,
              protected activatedRoute: ActivatedRoute,
              private exerciseTypeService: ExerciseTypeService) {
  }

  public onSubmit(form: NgForm): void {
    console.log(form);
    console.log(this.exercise);
    let observableAction;
    if (form.valid) {
      if (this.exercise.id) {
        observableAction = this.exercisesService.updateExercise(this.exercise);
      } else {
        observableAction = this.exercisesService.createExercise(this.exercise);
      }

      observableAction.subscribe({
        next: () => this.router.navigateByUrl('/exercises/' + this.routineId),
        error: error => console.error("Erreur de sauvegared :" + error)
      });
    }
  }

  ngOnInit(): void {
    this.routineId = this.activatedRoute.snapshot.params['routineId'];
    if (this.activatedRoute.snapshot.params['exoId']) {
      this.exercisesService.getExerciseById(this.activatedRoute.snapshot.params['exoId']).subscribe({
        next: exercise => this.exercise = {...exercise},
        error: error => this.router.navigateByUrl('/exercises/' + this.routineId)
      });
    } else {
      this.exercise = new Exercise();
      this.exercise.routineId = this.routineId;
    }

    this.exerciseTypeService.getAllExerciseType().subscribe({
      next: exerciseTypes => this.exercisesTypes = exerciseTypes,
      error: error => console.error("Erreur de chargement des types d'exercices : ", error)
    });

  }


}
