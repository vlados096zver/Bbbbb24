import { Component } from '@angular/core';
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.scss']
})
export class MenuDetailsComponent {
  constructor(public menu: MenuService) {
  }
}
