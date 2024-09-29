import {Component, HostListener, OnInit} from '@angular/core';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {Role} from "../../../core/enums/role";
import {JwtService} from "../../../core/services/jwt.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    MatNavList,
    MatListItem,
    MatIcon,
    NgIf,
    MatLabel,
    NgForOf,
    RouterLink,
    MatFormField,
    MatInput,
    MatSlideToggle,
    FormsModule,
    NgClass,
    MatTooltip,
    RouterLinkActive
  ],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  constructor(private authService: AuthenticationService, private jwtService:JwtService) {}

  logout(){
    this.authService.logout()
  }

  isAdmin(): boolean {
    const role = this.jwtService.getUserRoleFromStorage();
    return role === Role.ADMIN.toString();
  }

  ngOnInit(): void {
  }
}
