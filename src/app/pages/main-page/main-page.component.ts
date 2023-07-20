import {Component, HostListener, OnInit} from '@angular/core';
import {advantages} from "../../data/advantages";
import {IAdvantage, IFeature} from "../../models/data.model";
import {features} from "../../data/features";
import {MenuService} from "../../services/menu.service";
import {SwiperOptions} from "swiper";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  advantages: IAdvantage[] = advantages;
  features: IFeature[] = features;
  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  configAdvantage: SwiperOptions = {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 0,
  };

  constructor(public menu: MenuService) {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      this.menu.toBlock(true);
    } else if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      this.menu.toBlock(false);
    }
  }

  ngOnInit() {
    const bgLogo: any = document.getElementById('bgLogo');
    if (bgLogo) {
      bgLogo.muted = true;
      bgLogo.play();
    }


    this.innerWidth = window.innerWidth;
    setTimeout(() => {
      const section = this.menu.scrollTo;
      if (section) {
        const index = this.menu.anchors.findIndex(elem => elem === section);
        if (index > -1) {
          setTimeout(() => {
            this.menu.select(index);
          }, 300);
        }
        this.menu.scrollTo = undefined;
      }
    }, 0)
  }

}
