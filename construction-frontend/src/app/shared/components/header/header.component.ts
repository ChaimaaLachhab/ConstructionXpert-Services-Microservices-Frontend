import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import {Button, ButtonDirective} from "primeng/button";
import {FeatureComponent} from "../feature/feature.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/services/authentication.service";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, Button, ButtonDirective, FeatureComponent, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) {}

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }

  logout(){
    this.authService.logout()
  }

  login(){
    this.router.navigate(['/login'])
  }

  register(){
    this.router.navigate(['/register'])
  }

  @Output() openSidebar: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
  }
}
