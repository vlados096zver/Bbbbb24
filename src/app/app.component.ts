import { Component } from '@angular/core';
import {MenuService} from "./services/menu.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bbbbb24';
  constructor(
    public menu: MenuService,
  ) {
  }

  ngOnInit() {
    console.log('fffff', window.location.pathname)
    this.menu.routerSubscribe();
  }
}
