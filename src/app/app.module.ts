import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { RoutineListComponent } from './components/routine-list/routine-list.component';
import { RoutineItemComponent } from './components/routine-item/routine-item.component';
import { HeaderComponent } from './components/header/header.component';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { ExercisesItemComponent } from './components/exercises-item/exercises-item.component';
import { ExercisesEditComponent } from './components/exercises-edit/exercises-edit.component';
import {FormsModule} from "@angular/forms";
import { RoutineEditComponent } from './components/routine-edit/routine-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutineListComponent,
    RoutineItemComponent,
    HeaderComponent,
    ExercisesListComponent,
    ExercisesItemComponent,
    ExercisesEditComponent,
    RoutineEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
