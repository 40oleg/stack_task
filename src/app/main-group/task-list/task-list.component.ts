import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule, TuiIslandModule } from '@taiga-ui/kit';
import { Task } from '../../../types/Task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TuiButtonModule, TuiInputModule, TuiIslandModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  #tasks: Task[] = [];

  get tasks(): Task[] {
    return this.#tasks.filter(task => !task.hidden);
  }

  #taskListKey = 'taskList';

  constructor() {
    this.restoreState();
  }

  public addTask(taskName: string): void {
    this.#tasks.push(this.createNewTask(taskName));
    this.saveState();
  }

  public removeTask(uuid: string): void {
    const task = this.#tasks.find(el => el.uuid === uuid);
    if(task) {
      task.hidden = true;
    } 
    this.saveState();
  }

  private saveState() {
    localStorage.setItem(this.#taskListKey, JSON.stringify(this.#tasks))
  }

  private restoreState() {
    try {
      this.#tasks = JSON.parse(localStorage.getItem(this.#taskListKey) || '');
      // @todo Delete in v2. Parsing previous version of Task interface
      this.#tasks = this.#tasks.map(task => typeof task === 'string' ? this.createNewTask(task) : task);
    } catch (error) {
      console.log('Sorry, problem with restoring tasks happend')
    }
  }

  private createNewTask(taskName: string): Task {
    return {
      uuid: self.crypto.randomUUID(),
      name: taskName,
      description: '',
      hidden: false,
      createTime: Date.now(),
    }
  }
}
