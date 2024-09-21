import { Component } from '@angular/core';
import {StyleClassModule} from 'primeng/styleclass';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [StyleClassModule, ButtonDirective, Ripple],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
