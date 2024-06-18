import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { ChangeDetectionStrategy, Component, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainGroupComponent } from './main-group/main-group.component';
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainGroupComponent, TuiRootModule, TuiDialogModule, TuiAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  title = 'stack_task';
  constructor(public swUpdate: SwUpdate) {}
}
