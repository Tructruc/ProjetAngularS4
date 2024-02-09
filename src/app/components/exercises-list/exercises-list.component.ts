import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../models/exercise";
import {Observable} from "rxjs";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute} from "@angular/router";
import {Routine} from "../../models/routine";
import {ExerciseTypeService} from "../../services/exercise-type.service";
import {ExerciseType} from "../../models/exercise-type";

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrl: './exercises-list.component.scss'
})
export class ExercisesListComponent implements OnInit{
  public exercises!: Exercise[];
  public routine!: Routine;
  public totalRepetitions: number = 0;
  public totalWeight: number = 0;

  public exerciseTypes: ExerciseType[] = [];

  constructor(private routineService: RoutineService, private activatedRoute: ActivatedRoute, private exerciceTypeService: ExerciseTypeService) { }

  ngOnInit(): void {
    this.routineService.getAllExercises(this.activatedRoute.snapshot.params['id']).subscribe({
      next: exercises => {
        this.exercises = exercises;
        this.exercises.forEach(exercise => {
          this.totalRepetitions += parseInt(`${exercise.repetitions}`);
          this.totalWeight += parseInt(`${exercise.weight}`);
        });
      }
    }
    );
    this.routineService.getRoutineById(this.activatedRoute.snapshot.params['id']).subscribe(
      routine => this.routine = routine
    );

    this.exerciceTypeService.getAllExerciseType().subscribe({
      next: exerciseTypes => this.exerciseTypes = exerciseTypes
    });
  }
}
