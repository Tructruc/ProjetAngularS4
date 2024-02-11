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

  getExerciseStatus(id: number): boolean {
    // Get the status from the exercise in the local storage, if the date is before today, the status is reset to false
    // The data is stored in the local storage as a JSON object with the key being the exercise id containing the status and the date

    // Get the status from the local storage
    let status = window.localStorage.getItem(id.toString());

    if (status){
      let statusObj = JSON.parse(status);

      // Check if the date is before today
      let today = new Date();
      let date = new Date(statusObj.date);
      if (date.getDate() < today.getDate() || date.getMonth() < today.getMonth() || date.getFullYear() < today.getFullYear()){
        // Reset the status to false
        statusObj.status = false;
        window.localStorage.setItem(id.toString(), JSON.stringify(statusObj));
        return false;
      }
      return statusObj.status;
    }
    return false;
  }

  setExerciseStatus(id:number, status: boolean) {
    // Set the status of the exercise in the local storage
    let statusObj = {
      status: status,
      date: new Date()
    };
    window.localStorage.setItem(id.toString(), JSON.stringify(statusObj));
  }
}
