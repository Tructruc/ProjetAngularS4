import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class Exerciseervice {
  private baseUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient, private router:Router) { }

  getAllExercise(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.baseUrl);
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.baseUrl}/${id}`);
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.baseUrl, exercise);
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.baseUrl}/${exercise.id}`, exercise);
  }

  deleteExercise(exercise: Exercise){
    return this.http.delete(`${this.baseUrl}/${exercise.id}`).subscribe(
      {
        next: () => {
          this.router.navigateByUrl("/").then(() => this.router.navigateByUrl("/exercises/"+exercise.routineId))
        }
      }
    );
  }
}
