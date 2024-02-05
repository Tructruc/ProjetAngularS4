import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../models/exercise";
import {Observable} from "rxjs";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute} from "@angular/router";
import {Routine} from "../../models/routine";

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrl: './exercises-list.component.scss'
})
export class ExercisesListComponent implements OnInit{
  public exercises!: Exercise[];
  public routine!: Routine;

  constructor(private routineService: RoutineService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routineService.getAllExercises(this.activatedRoute.snapshot.params['id']).subscribe(
      exercises => this.exercises = exercises
    );
    this.routineService.getRoutineById(this.activatedRoute.snapshot.params['id']).subscribe(
      routine => this.routine = routine
    );
  }
}
