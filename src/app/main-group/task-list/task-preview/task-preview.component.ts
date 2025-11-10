import { TuiIslandDirective, TuiInputModule } from '@taiga-ui/legacy';
import { Component, EventEmitter, inject, Injector, Input, Output, signal } from '@angular/core';
import { TuiGroup, TuiButton, TuiIcon, TuiDialogService } from '@taiga-ui/core';
import { Task } from '../../../../types/Task';
import { Subject, interval, takeUntil } from 'rxjs';
import { TaskComponent } from '../../task/task.component';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';

@Component({
    selector: 'app-task-preview',
    imports: [TuiButton, TuiIslandDirective, TuiGroup, TuiInputModule, TuiIcon],
    templateUrl: './task-preview.component.html',
    styleUrl: './task-preview.component.less',
})
export class TaskPreviewComponent {
    deletePendingCounter = signal(Infinity);

    private readonly dialogs = inject(TuiDialogService);

    #destroy$: Subject<void> = new Subject();

    constructor(private readonly injector: Injector) {
        interval(1000)
            .pipe(takeUntil(this.#destroy$))
            .subscribe(() => {
                this.deletePendingCounter.update((val: any) => val - 1);
                if (this.deletePendingCounter() === 0) {
                    this.removeTaskEmitter.emit(this.task.uuid);
                }
            });
    }

    @Input('task')
    task!: Task;

    @Input('allTasks')
    allTasks: Task[] = [];

    @Output('removeTask')
    removeTaskEmitter: EventEmitter<string> = new EventEmitter();

    @Output('updateTask')
    updateTaskEmitter: EventEmitter<Task> = new EventEmitter();

    get Infinity() {
        return Infinity;
    }

    get children(): Task[] {
        return this.allTasks.filter((el) => el.parentId === this.task.uuid);
    }

    markAsCompleted() {
        this.deletePendingCounter.set(5);
    }

    markAsNotCompleted() {
        this.deletePendingCounter.set(this.Infinity);
    }

    editTask(task: Task) {
        const comp = new PolymorpheusComponent(TaskComponent, this.injector);
        this.dialogs
            .open(comp, {
                data: { task, allTasks: this.allTasks },
            })
            .subscribe({
                next: (newTask: any) => {
                    this.task = newTask;
                    this.updateTaskEmitter.emit(newTask);
                },
                complete: () => {
                    console.info('Dialog closed');
                },
            });
    }

    formatDate(date: number): string {
        const now = new Date(date);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        const formatted = `${hours}:${minutes} ${day}.${month}.${year}`;
        return formatted;
    }

    ngOnDestroy() {
        this.#destroy$.next();
    }
}
