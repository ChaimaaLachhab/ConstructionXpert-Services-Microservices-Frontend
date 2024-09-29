import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StyleClassModule} from 'primeng/styleclass';
import {HeaderComponent} from "./shared/components/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StyleClassModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'construction-frontend';
}
