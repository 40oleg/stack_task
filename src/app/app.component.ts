import { TUI_SANITIZER } from '@taiga-ui/legacy';
import { NgDompurifySanitizer } from '@taiga-ui/dompurify';
import { TuiRoot, TuiAlert, TuiDialog } from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainGroupComponent } from './main-group/main-group.component';
import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MainGroupComponent, TuiRoot, TuiDialog, TuiAlert],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }]
})
export class AppComponent {
    title = 'stack_task';
    constructor(public swUpdate: SwUpdate) {}
}
