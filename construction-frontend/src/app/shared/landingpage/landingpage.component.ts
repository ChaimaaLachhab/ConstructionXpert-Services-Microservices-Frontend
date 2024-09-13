import { Component } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {CheckboxModule} from "primeng/checkbox";
import {StyleClassModule} from 'primeng/styleclass';
import {ChipsModule} from "primeng/chips";
import {HeroComponent} from "../components/hero/hero.component";
import {SidebarComponent} from "../components/sidebar/sidebar.component";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonDirective,
    Ripple,
    CheckboxModule,
    StyleClassModule,
    ChipsModule,
    HeroComponent,
    SidebarComponent
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

}
