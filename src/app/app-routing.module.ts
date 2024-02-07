import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoutineListComponent} from "./components/routine-list/routine-list.component";
import {ExercisesListComponent} from "./components/exercises-list/exercises-list.component";
import {ExercisesEditComponent} from "./components/exercises-edit/exercises-edit.component";

const routes: Routes = [
  {path: 'exercises/:routineId/edit/:exoId', component:ExercisesEditComponent},
  {path: 'exercises/:routineId/edit', component:ExercisesEditComponent},
  {path: 'exercises/:id', component:ExercisesListComponent},
  {path: '', component:RoutineListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
