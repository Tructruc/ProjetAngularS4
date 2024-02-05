import {Component, Input} from '@angular/core';
import {Exercise} from "../../models/exercise";

@Component({
  selector: 'app-exercises-item',
  templateUrl: './exercises-item.component.html',
  styleUrl: './exercises-item.component.scss'
})
export class ExercisesItemComponent {
  @Input()
  public exercise: Exercise = new Exercise();
}
