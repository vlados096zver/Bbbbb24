import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "../components/footer/footer.component";
import {AdvantageComponent} from "../components/advantage/advantage.component";
import {FeatureComponent} from "../components/feature/feature.component";
import {HeaderComponent} from "../components/header/header.component";
import {LearnMorePageComponent} from "../pages/learn-more-page/learn-more-page.component";
import {ToggleElemDirective} from "../directives/toggleelem.directive";
import {FaqComponent} from "../components/faq/faq.component";
import {MenuDetailsComponent} from "../dialogs/menu-details/menu-details.component";

const components = [
  AdvantageComponent,
  FeatureComponent,
  FooterComponent,
  HeaderComponent,
  LearnMorePageComponent,
  ToggleElemDirective,
  FaqComponent,
  MenuDetailsComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components
  ],
})
export class MainModule { }
