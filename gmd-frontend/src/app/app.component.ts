import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = "GMD";
  private isDefaultLanguage = true;
  private languageService = inject(TranslocoService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  switchActiveLanguage() {
    this.isDefaultLanguage = !this.isDefaultLanguage;
    this.languageService.setActiveLang(this.isDefaultLanguage ? 'en' : 'de');
  }

  gotoHome() {
    this.router.navigate(['/welcome'], { relativeTo: this.route });
  }
}
