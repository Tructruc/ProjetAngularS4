import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routine, Status } from '../models/routine';
import {Exercise} from "../models/exercise";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  private baseUrl = 'http://localhost:3000/routines';

  constructor(private http: HttpClient) { }

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

  deleteRoutine(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
