import {Component, Input} from '@angular/core';
import {Routine} from "../../models/routine";
import { RoutineService } from '../../services/routine.service';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-routine-edit',
  templateUrl: './routine-edit.component.html',
  styleUrl: './routine-edit.component.scss'
})
export class RoutineEditComponent {
  @Input() routine: Routine = new Routine();

  constructor(private routineService: RoutineService, private router: Router, protected activatedRoute: ActivatedRoute) {
  }

  public onSubmit(form: NgForm): void {
    console.log(form);
    let observableAction;
    if (form.valid) {
      if (this.routine.id) {
        observableAction = this.routineService.updateRoutine(this.routine);
      } else {
        observableAction = this.routineService.createRoutine(this.routine);
      }

      observableAction.subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: error => console.error("Erreur de sauvegared :" + error)
      });
    }
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.routineService.getRoutineById(this.activatedRoute.snapshot.params['id']).subscribe({
        next: routine => this.routine = {...routine},
        error: error => this.router.navigateByUrl('/')
      });
    } else {
      this.routine = new Routine();
    }
  }
}
