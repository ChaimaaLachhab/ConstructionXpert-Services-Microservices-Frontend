import { Component } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {SidebarComponent} from "../components/sidebar/sidebar.component";
import {StatsComponent} from "../components/stats/stats.component";
import {ListProjectComponent} from "../../features/project/list-project/list-project.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    StatsComponent,
    ListProjectComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
