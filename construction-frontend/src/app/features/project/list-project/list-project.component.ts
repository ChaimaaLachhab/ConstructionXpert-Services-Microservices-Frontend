import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CommonModule} from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {TagModule} from 'primeng/tag';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {Project} from "../../../core/models/project.model";
import {ProjectService} from "../../../core/services/project.service";
import {CalendarModule} from "primeng/calendar";
import {Status} from "../../../core/enums/status";

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, DropdownModule, TagModule, FormsModule, InputNumberModule, CalendarModule],
  providers: [MessageService, ConfirmationService, ProjectService],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.css'
})
export class ListProjectComponent implements OnInit {
  projectDialog: boolean = false;

  projects!: Project[];

  project!: Project;

  selectedProjects!: Project[] | null;

  submitted: boolean = false;

  statuses = Object.values(Status);

  constructor(private projectService: ProjectService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.loadProjects();
  }

  visible: boolean = false;

  showProject(project :Project) {
    this.projectService.getProjectById(project.id!).subscribe({
      next: (projects) => {
        this.project = project;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Projects load Successfully', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load projects', life: 3000 });
      }
    });
    this.visible = true;
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load projects', life: 3000 });
      }
    });
  }

  openNew() {
    this.project = { name: '', description: '', startDate: '', endDate: '', budget: 0, status: Status.TO_DO };
    this.submitted = false;
    this.projectDialog = true;
  }

  deleteSelectedProjects() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected projects?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let deletionSuccess = true;

        this.selectedProjects?.forEach((project) => {
          this.projectService.deleteProject(project.id!).subscribe({
            next: () => {},
            error: () => {
              deletionSuccess = false;
            }
          });
        });
        this.selectedProjects = null;
        if (deletionSuccess) {
          this.loadProjects();
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Projects Deleted', life: 3000});
        } else {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred while deleting some projects.', life: 3000});
        }
      }
    });
  }


  editProject(project: Project) {
    this.project = { ...project };
    this.projectDialog = true;
  }

  deleteProject(project: Project) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + project.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.deleteProject(project.id!).subscribe({
          next: () => {
            this.loadProjects();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting project.', life: 3000 });
          }
        })
      }
    });
  }

  hideDialog() {
    this.projectDialog = false;
    this.submitted = false;
  }

  saveProject() {
    this.submitted = true;

    if (this.project.name?.trim()) {
      if (this.project.id) {
        this.projectService.updateProject(this.project.id, this.project).subscribe(() => {
          this.projects[this.findIndexById(this.project.id)] = this.project;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Updated', life: 3000 });
        });
      } else {
        this.projectService.createProject(this.project).subscribe((newProject) => {
          this.projects.push(newProject);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Created', life: 3000 });
        });
      }

      this.projects = [...this.projects];
      this.projectDialog = false;
      this.project = { name: '', description: '', startDate: '', endDate: '', budget: 0, status: Status.TO_DO };
    }
  }

  findIndexById(id: number | undefined ): number {
    return this.projects.findIndex((project) => project.id === id);
  }

  getSeverity(status: Status): 'info' | 'warning' | 'success' | undefined {
    switch (status) {
      case Status.TO_DO:
        return 'info';
      case Status.IN_PROGRESS:
        return 'warning';
      case Status.DONE:
        return 'success';
      default:
        return undefined;
    }
  }
}
