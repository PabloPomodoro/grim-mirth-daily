import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCircleInfo, faSun} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = "gmd-frontend";

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  faSun = faSun;
  faCircleInfo = faCircleInfo;

  navigateToQA() {
    this.router.navigate(['qa'], { relativeTo: this.route });
  }
}
