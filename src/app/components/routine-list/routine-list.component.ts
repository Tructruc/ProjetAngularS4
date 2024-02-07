import { Component, OnInit } from '@angular/core';
import {Routine, Status} from '../../models/routine';
import {RoutineService} from "../../services/routine.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.scss']
})
export class RoutineListComponent implements OnInit {
  public routines!: Observable<Routine[]>;

  public statusFilter: string = "all";
  constructor(private routineService: RoutineService) { }

  ngOnInit(): void {
    this.routines = this.routineService.getAllRoutines()
  }
}
