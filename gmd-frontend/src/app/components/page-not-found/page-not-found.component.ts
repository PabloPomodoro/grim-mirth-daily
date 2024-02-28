import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslocoPipe} from '@ngneat/transloco';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    TranslocoPipe
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  gotoHome() {
    this.router.navigate(['/welcome'], { relativeTo: this.route });
  }
}
