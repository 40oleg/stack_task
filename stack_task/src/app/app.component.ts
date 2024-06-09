import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainGroupComponent } from './main-group/main-group.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainGroupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'stack_task';
}
