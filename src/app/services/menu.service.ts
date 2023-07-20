import { Injectable } from '@angular/core';

import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public anchors = ['info', 'advantage', 'feature', 'about'];
  public currentAnchor = 0;
  public isMain?: boolean;
  public isAnimating  = false;
  public isScrolling = false;
  public scrollTo?: string;

  public points = [
    {
      link: 'Переваги',
      key: 'advantage'
    },
    {
      link: 'Для кого?',
      key: 'feature'
    },
    {
      link: 'Хто ми',
      key: 'about'
    }
  ];

  public showMenu = false;

  constructor( public router: Router) { }
  scroll(event: any ): void {
    console.log(document.body.clientWidth)
    if (!this.isScrolling ) {
      this.isScrolling = true;
      event.preventDefault();
      event.stopPropagation();
      this.toBlock(event.wheelDelta >= 0);
      setTimeout(() => {
        this.isScrolling = false;
      }, 2000);
    }
  }

  toBlock(direction: boolean): void {
    const width = document.body.clientWidth;
    const height = window.screen.height;
    if (width > 1023 && height > 800) {
      if( this.isAnimating ) return;
      const temp = this.currentAnchor;
      direction ? this.currentAnchor-- : this.currentAnchor++;
      if(!(this.currentAnchor > (this.anchors.length - 1)) && !(this.currentAnchor < 0) ) {
        this.select(this.currentAnchor);
      } else {
        this.currentAnchor = temp;
      }
    }
  }

  select(index: number): void {
    this.isAnimating  = true;
    const section = document.getElementById(this.anchors[index]);
    this.currentAnchor = index;
    if (section) {
      const top = section.offsetTop;
      setTimeout(() => {
        this.doScrolling(top, 500)
      }, 300)
      setTimeout(() => {
        this.isAnimating  = false;
      }, 500)
    }
  }

  doScrolling(elementY: number, duration: number) {
    const startingY = window.pageYOffset;
    const diff = elementY - startingY;
    let start: any;
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const time = timestamp - start;

      function calculate (time: number, duration: number) {
        return time / duration * (2 - time / duration);
      }

      window.scrollTo(0, startingY + diff * calculate(time, duration));
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    })
  }

  openMainSection(section: string, hideMenu?: boolean): void {

    if (window.location.pathname !== '/') {
      setTimeout(() => {
        this.scrollTo = section;
        this.router.navigate([section]);
      }, 300);
    } else {
      const index = this.anchors.findIndex(elem => elem === section);
      if (index > -1) {
        this.select(index);
      }
    }
    if(hideMenu) {
      this.showMenu = false;
      this.allowScroll();
    }
  }

  routerSubscribe(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (window.location.pathname !== '/') {
          document.body.style.overflow = 'auto';
          this.isMain = false;
        } else {
          const width = document.body.clientWidth;
          const height = window.screen.height;
          if (width > 1023 && height > 800) {
            document.body.style.overflow = 'hidden';
          }
          this.isMain = true;
        }
      }
    });
  }

  openMenu() {
    this.showMenu = !this.showMenu;
    if(this.showMenu) {
      this.disAllowScroll();
    } else {
      this.allowScroll();
    }
  }

  public allowScroll() {
    document.documentElement.classList.remove('hidden');
    document.body.classList.remove('hidden');
  }

  public disAllowScroll() {
    document.documentElement.classList.add('hidden');
    document.body.classList.add('hidden');
  }

}
