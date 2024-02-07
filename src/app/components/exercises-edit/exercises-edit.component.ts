import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Exerciseervice} from "../../services/exercise.service";
import {NgForm} from "@angular/forms";
import {Routine} from "../../models/routine";
import {RoutineService} from "../../services/routine.service";
import {Exercise} from "../../models/exercise";

@Component({
  selector: 'app-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrl: './exercises-edit.component.scss'
})
export class ExercisesEditComponent implements OnInit {
  @Input() exercise: Exercise = new Exercise();
  private routineId: number = 0;

  constructor(private exercisesService: Exerciseervice, private routineService: RoutineService, private router: Router, protected activatedRoute: ActivatedRoute) {
  }

  public onSubmit(form: NgForm): void {
    console.log(form);
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
  }


}
