import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CatFact} from "./CatFact";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  catFacts: CatFact[];
  httpClient = inject(HttpClient);

  public constructor() {
    this.catFacts = [];
    this.simulateServerResponseTime();
  }

  loadCatFacts() {
    this.httpClient.get<CatFact[]>("https://cat-fact.herokuapp.com/facts").subscribe(result => {
      this.catFacts = result;
    });
  }

  simulateServerResponseTime() {
    // simulate server response time
    setTimeout(() => {
      this.loadCatFacts()
    }, 750);
  }

  shiftToNextFact() {
    if (this.catFacts.length >= 0) {
      this.catFacts.pop();
    }
  }
}
