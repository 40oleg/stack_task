import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-main-group',
  standalone: true,
  imports: [TaskListComponent],
  templateUrl: './main-group.component.html',
  styleUrl: './main-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainGroupComponent {

}
