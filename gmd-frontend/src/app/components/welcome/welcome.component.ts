import {Component, inject} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ActivatedRoute, Router} from '@angular/router';
import {faCircleInfo, faSun} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome',
  standalone: true,
    imports: [
        FaIconComponent
    ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  faSun = faSun;
  faCircleInfo = faCircleInfo;

  navigateToQA() {
    this.router.navigate(['/qa'], { relativeTo: this.route });
  }
}
