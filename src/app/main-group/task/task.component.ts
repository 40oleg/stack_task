import { Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiTextfield } from '@taiga-ui/core';
import { Task } from '../../../types/Task';
import { TuiTextareaModule } from '@taiga-ui/legacy';
import {POLYMORPHEUS_CONTEXT} from '@taiga-ui/polymorpheus';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TuiTextfield, TuiButton, ReactiveFormsModule, TuiTextareaModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less'
})
export class TaskComponent {
  private readonly context =
        inject<TuiDialogContext<Task, Task>>(POLYMORPHEUS_CONTEXT);

  task!: Task;
  
  protected name: FormControl<string>;
  protected description: FormControl<string>;

  private destroy$: Subject<null> = new Subject();

  constructor() {
    this.name = new FormControl('', [Validators.required]) as FormControl<string>;
    this.description = new FormControl('') as FormControl<string>;
  }

  ngOnInit() {
    this.task = structuredClone(this.context.data);
    this.name.setValue(this.task.name);
    this.description.setValue(this.task.description)
    this.name.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((newName: string) => {
      this.task.name = newName;
    })
    this.description.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((newDescription: string) => {
      this.task.description = newDescription;
    })
  }

  submit() {
    if(this.name.valid) {
      this.context.completeWith(this.task);
    } else {
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
