import {Component, OnInit} from '@angular/core';
import {StyleClassModule} from 'primeng/styleclass';
import {Role} from "../../../core/enums/role";
import {JwtService} from "../../../core/services/jwt.service";
import {ProjectService} from "../../../core/services/project.service";
import {TaskService} from "../../../core/services/task.service";
import {ResourceService} from "../../../core/services/resource.service";
import {UserService} from "../../../core/services/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [StyleClassModule, NgIf],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnInit {
  projectCount: number = 0;
  taskCount: number = 0;
  resourceCount: number = 0;
  userCount: number = 0;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private resourceService: ResourceService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    this.loadProjectStatistics();
    this.loadTaskStatistics();
    if (this.isAdmin()) {
      this.loadResourceStatistics();
      this.loadUserStatistics();
    }
  }

  // Load project statistics
  loadProjectStatistics() {
    this.projectService.getAllProjects().subscribe(
      (projects) => this.projectCount = projects.length,
      (error) => console.error('Failed to load project statistics', error)
    );
  }

  // Load task statistics
  loadTaskStatistics() {
    this.taskService.getAllTasks().subscribe(
      (tasks) => this.taskCount = tasks.length,
      (error) => console.error('Failed to load task statistics', error)
    );
  }

  // Load resource statistics (for admins)
  loadResourceStatistics() {
    this.resourceService.getAllResources().subscribe(
      (resources) => this.resourceCount = resources.length,
      (error) => console.error('Failed to load resource statistics', error)
    );
  }

  // Load user statistics (for admins)
  loadUserStatistics() {
    this.userService.getAllUsers().subscribe(
      (users) => this.userCount = users.length,
      (error) => console.error('Failed to load user statistics', error)
    );
  }

  isAdmin(): boolean {
    const role = this.jwtService.getUserRoleFromStorage();
    return role === Role.ADMIN.toString();
  }

}
