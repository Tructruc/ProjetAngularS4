import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercises } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient) { }

  getAllExercises(): Observable<Exercises[]> {
    return this.http.get<Exercises[]>(this.baseUrl);
  }

  getExerciseById(id: number): Observable<Exercises> {
    return this.http.get<Exercises>(`${this.baseUrl}/${id}`);
  }

  createExercise(exercise: Exercises): Observable<Exercises> {
    return this.http.post<Exercises>(this.baseUrl, exercise);
  }

  updateExercise(id: number, exercise: Exercises): Observable<Exercises> {
    return this.http.put<Exercises>(`${this.baseUrl}/${id}`, exercise);
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
