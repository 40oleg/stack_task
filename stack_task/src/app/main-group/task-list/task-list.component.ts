import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ListboxModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
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
