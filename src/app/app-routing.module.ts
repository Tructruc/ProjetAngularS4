import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoutineListComponent} from "./components/routine-list/routine-list.component";
import {ExercisesListComponent} from "./components/exercises-list/exercises-list.component";

const routes: Routes = [
  {path: 'exercises/:id', component:ExercisesListComponent},
  {path: '', component:RoutineListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
