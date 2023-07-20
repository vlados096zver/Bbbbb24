import { Component } from '@angular/core';
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-learn-more-page',
  templateUrl: './learn-more-page.component.html',
  styleUrls: ['./learn-more-page.component.scss']
})
export class LearnMorePageComponent {
  public scroll(event: string) {
    const element = document.getElementById(event);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      window.scroll({
        top: elementPosition + window.pageYOffset ,
        behavior: "smooth",
      });
    }
  }
}
