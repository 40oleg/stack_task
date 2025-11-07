import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiTextfield, TuiIcon } from '@taiga-ui/core';
import { Task } from '../../../types/Task';
import { TuiTextareaModule } from '@taiga-ui/legacy';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { Subject, takeUntil } from 'rxjs';
import { TuiDataListWrapper } from '@taiga-ui/kit/components/data-list-wrapper';
import { NgIf } from '@angular/common';
import { TuiTooltip } from '@taiga-ui/kit/directives/tooltip';
import { TuiSelect } from '@taiga-ui/kit';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [
        TuiTextfield,
        TuiButton,
        ReactiveFormsModule,
        TuiTextareaModule,
        FormsModule,
        TuiDataListWrapper,
        TuiIcon,
        NgIf,
        TuiTextfield,
        TuiTooltip,
        TuiSelect,
        TuiButton,
    ],
    templateUrl: './task.component.html',
    styleUrl: './task.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
    private readonly context =
        inject<TuiDialogContext<Task, { task: Task; allTasks: Task[] }>>(POLYMORPHEUS_CONTEXT);

    task!: Task;

    parentTask: Task | null = null;

    protected name: FormControl<string>;
    protected description: FormControl<string>;

    @Input({ required: true })
    protected allTasks: Task[] = [];

    private destroy$: Subject<null> = new Subject();

    constructor() {
        this.name = new FormControl('', [Validators.required]) as FormControl<string>;
        this.description = new FormControl('') as FormControl<string>;
    }

    ngOnInit() {
        const data = structuredClone(this.context.data);
        this.task = data.task;
        this.allTasks = [...data.allTasks];
        this.parentTask = this.allTasks.find((el) => el.uuid === this.task.parentId) || null;
        this.name.setValue(this.task.name);
        this.description.setValue(this.task.description);
        this.name.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((newName: string) => {
            this.task.name = newName;
        });
        this.description.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((newDescription: string) => {
                this.task.description = newDescription;
            });
    }

    submit() {
        if (this.name.valid) {
            this.task.parentId = this.parentTask?.uuid || null;
            this.context.completeWith(this.task);
        } else {
        }
    }

    ngOnDestroy() {
        this.destroy$.next(null);
    }

    stringify(task: Task) {
        return task.name;
    }
}
