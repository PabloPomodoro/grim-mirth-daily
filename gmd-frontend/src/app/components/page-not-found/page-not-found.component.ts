import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faCircleQuestion} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected readonly faCircleQuestion = faCircleQuestion;

  gotoHome() {
    this.router.navigate(['/welcome'], { relativeTo: this.route });
  }
}
