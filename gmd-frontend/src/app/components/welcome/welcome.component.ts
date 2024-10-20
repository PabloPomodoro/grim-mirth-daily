import {Component, inject} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ActivatedRoute, Router} from '@angular/router';
import {faCircleInfo, faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FaIconComponent, TranslocoPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected readonly faCalendarDays = faCalendarDays;
  protected readonly faCircleInfo = faCircleInfo;

  navigateToQA() {
    this.router.navigate(['/qa'], {relativeTo: this.route});
  }
}
