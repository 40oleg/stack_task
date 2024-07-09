import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import { TuiInputModule, TuiIslandModule } from '@taiga-ui/kit';
import { Task } from '../../../../types/Task';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TuiButtonModule, TuiIslandModule, TuiGroupModule, TuiInputModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less'
})
export class TaskComponent {
  deletePendingCounter = signal(Infinity);

  #destroy$: Subject<void> = new Subject();

  constructor() {
    interval(1000).pipe(takeUntil(this.#destroy$)).subscribe(() => {
      this.deletePendingCounter.update((val) => val -1);
      if(this.deletePendingCounter() === 0) {
        this.removeTaskEmitter.emit(this.task.uuid);
      }
    })
  }

  @Input('task') 
  task!: Task;

  @Output('removeTask')
  removeTaskEmitter: EventEmitter<string> = new EventEmitter();

  get Infinity() {
    return Infinity;
  }

  markAsCompleted() {
    this.deletePendingCounter.set(5);
  }

  markAsNotCompleted() {
    this.deletePendingCounter.set(this.Infinity);
  }

  ngOnDestroy() {
    this.#destroy$.next();
  }
}
