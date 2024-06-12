import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule, TuiIslandModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TuiButtonModule, TuiInputModule, TuiIslandModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  tasks: string[] = [];

  #taskListKey = 'taskList';

  constructor() {
    this.restoreState();
  }

  public addTask(taskName: string): void {
    this.tasks.push(taskName);
    this.saveState();
  }

  public removeTask(taskName: string): void {
    this.tasks.splice(this.tasks.findIndex(el => el === taskName), 1);
    this.saveState();
  }

  private saveState() {
    localStorage.setItem(this.#taskListKey, JSON.stringify(this.tasks))
  }

  private restoreState() {
    try {
      this.tasks = JSON.parse(localStorage.getItem(this.#taskListKey) || '');
    } catch (error) {
      console.log('Sorry, problem with restoring tasks happend')
    }
  }
}
