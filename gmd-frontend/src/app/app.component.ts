import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {TranslocoService} from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public title = 'GMD';
  protected isDefaultLanguage = true;
  private languageService = inject(TranslocoService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const isDefaultLanguageSelected = localStorage.getItem(
      'isDefaultLanguageSelected',
    );
    if (isDefaultLanguageSelected) {
      this.languageService.setActiveLang(
        this.getActiveLanguage(
          this.isLocalStorageDefaultLanguageStringTrue(
            isDefaultLanguageSelected,
          ),
        ),
      );
      this.isDefaultLanguage = this.isLocalStorageDefaultLanguageStringTrue(
        isDefaultLanguageSelected,
      );
    }
  }

  switchActiveLanguage(): void {
    this.isDefaultLanguage = !this.isDefaultLanguage;
    this.languageService.setActiveLang(
      this.getActiveLanguage(this.isDefaultLanguage),
    );
    localStorage.setItem(
      'isDefaultLanguageSelected',
      JSON.stringify(this.isDefaultLanguage),
    );
  }

  private getActiveLanguage(isDefaultLanguageActive: boolean): string {
    return isDefaultLanguageActive ? 'en' : 'de';
  }

  private isLocalStorageDefaultLanguageStringTrue(
    booleanString: string,
  ): boolean {
    return booleanString === 'true';
  }

  gotoHome(): void {
    this.router.navigate(['/welcome'], {relativeTo: this.route});
  }
}
