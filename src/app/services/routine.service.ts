import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routine, Status } from '../models/routine';
import {Exercise} from "../models/exercise";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  private baseUrl = 'http://localhost:3000/routines';

  constructor(private http: HttpClient, private router: Router) { }

  getAllRoutines(): Observable<Routine[]> {
    return this.http.get<Routine[]>(this.baseUrl);
  }

  getRoutineById(id: number): Observable<Routine> {
    return this.http.get<Routine>(`${this.baseUrl}/${id}`);
  }

  getAllExercises(id: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/${id}/exercises`);
  }

  createRoutine(routine: Routine): Observable<Routine> {
    return this.http.post<Routine>(this.baseUrl, routine);
  }

  updateRoutine(routine: Routine): Observable<Routine> {
    return this.http.put<Routine>(`${this.baseUrl}/${routine.id}`, routine);
  }

  deleteRoutine(routine: Routine){
    this.http.delete(`${this.baseUrl}/${routine.id}`).subscribe(
        {
          next: () => {
            this.router.navigateByUrl("/exercises/1").then(
                () => this.router.navigateByUrl("/")
            )

          }
        }
    );
  }
}
