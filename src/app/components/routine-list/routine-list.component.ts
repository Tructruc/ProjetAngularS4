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
  public finishedFilter: string = "all";
  constructor(private routineService: RoutineService) { }

  ngOnInit(): void {
    this.routines = this.routineService.getAllRoutines()
  }

  closeDropdown(event: MouseEvent, dropdownId: string): void {
    event.stopPropagation(); // Stop propagation to keep the menu from reopening
    const dropdownElement = document.getElementById(dropdownId);

    const dropdownButton = dropdownElement?.querySelector('.dropdown-toggle');

    // remove the show class from the dropdown
    dropdownButton?.classList.remove("show");
    // remove the inline style from the dropdown
    dropdownButton?.removeAttribute("style");
    // put aria-expanded to false
    dropdownButton?.setAttribute("aria-expanded", "false");


    // remove the show class from the dropdown menu
    const dropdownMenu = dropdownElement?.querySelector('.dropdown-menu');
    dropdownMenu?.classList.remove("show");
  }

  protected readonly console = console;
}
