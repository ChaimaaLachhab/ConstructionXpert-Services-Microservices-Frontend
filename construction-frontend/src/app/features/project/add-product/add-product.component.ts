import {Component, OnInit} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Project} from "../../../core/models/project.model";
import {Status} from "../../../core/enums/status";
import {ProjectService} from "../../../core/services/project.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    ReactiveFormsModule,
    NgForOf,
    ButtonDirective
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements  OnInit{
  visible: boolean = false;
  createProjectForm!: FormGroup;
  projects: Project[] = [];
  projectStatuses = Object.values(Status);

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createProjectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createProjectForm.valid) {
      const newProject = this.createProjectForm.value;

      this.projectService.createProject(newProject).subscribe({
        next: createdProject => {
          this.projects.push(createdProject);
          this.visible = false;
          this.createProjectForm.reset();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project created successfully' });
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create project' })
      });
    }
  }

  showDialog() {
    this.visible = true;
  }

}
