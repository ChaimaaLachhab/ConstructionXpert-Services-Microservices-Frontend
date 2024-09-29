import { Component } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {CheckboxModule} from "primeng/checkbox";
import {StyleClassModule} from 'primeng/styleclass';
import {ChipsModule} from "primeng/chips";
import {SidebarComponent} from "../dashboard/sidebar/sidebar.component";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {FooterComponent} from "../components/footer/footer.component";
import {ListProjectComponent} from "../../features/project/list-project/list-project.component";
import {RouterOutlet} from "@angular/router";
import {FeatureComponent} from "./feature/feature.component";
import {HeroComponent} from "./hero/hero.component";

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
        SidebarComponent,
        PasswordModule,
        FormsModule,
        FeatureComponent,
        FloatLabelModule,
        FooterComponent,
        ListProjectComponent,
        RouterOutlet
    ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
}
