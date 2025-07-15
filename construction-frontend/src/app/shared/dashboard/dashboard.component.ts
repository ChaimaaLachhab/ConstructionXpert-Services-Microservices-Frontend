import { Component } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {ListProjectComponent} from "../../features/project/list-project/list-project.component";
import {RouterOutlet} from "@angular/router";
import {StatsComponent} from "./stats/stats.component";
import {SidebarComponent} from "./sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    StatsComponent,
    ListProjectComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
