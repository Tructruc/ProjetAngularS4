import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExerciseType} from "../models/exercise-type";

@Injectable({
  providedIn: 'root'
})
export class ExerciseTypeService {
  private baseUrl = 'http://localhost:3000/exerciseTypes';

  constructor(private http: HttpClient) { }

  getAllExerciseType(): Observable<ExerciseType[]> {
    return this.http.get<ExerciseType[]>(this.baseUrl);
  }
}
