import {Component, OnInit, ViewChild} from '@angular/core';
import {ButtonDirective, ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {Table, TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {Project} from "../../../core/models/project.model";
import {Status} from "../../../core/enums/status";
import {ProjectService} from "../../../core/services/project.service";
import {AddProductComponent} from "../add-product/add-product.component";
import {PaginatorModule} from "primeng/paginator";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-filter-projects',
  templateUrl: './filter-projects.component.html',
  standalone: true,
  imports: [
    ButtonDirective,
    ConfirmDialogModule,
    DropdownModule,
    InputTextModule,
    NgIf,
    PrimeTemplate,
    Ripple,
    TableModule,
    TagModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    NgForOf,
    AddProductComponent,
    CurrencyPipe,
    PaginatorModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatButton,
    RouterLink,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    MatFormField,
    MatInput,
    DatePipe,
    MatLabel,
    MatSortHeader,
    MatIcon,
    MatSelect,
    MatOption,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatDatepicker,
    MatHint
  ],
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./filter-projects.component.scss']
})
export class FilterProjectsComponent implements OnInit {
  project: Project | undefined;
  visible: Boolean = false;
  displayedColumns: string[] = ['id', 'name', 'status', 'startDate', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  totalProjects: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  sortField: string = 'id';
  sortDirection: string = 'asc';

  filterForm: FormGroup;
  statusOptions = Object.values(Status);

  constructor(private projectService: ProjectService, private fb: FormBuilder, private messageService: MessageService,) {
    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      startDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    const { name, status, startDate } = this.filterForm.value;

    this.projectService.getFilteredProjects(
      this.currentPage,
      this.pageSize,
      this.sortField,
      this.sortDirection,
      name,
      status,
      startDate
    ).subscribe((data) => {
      this.dataSource.data = data.content;
      this.totalProjects = data.totalElements;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadProjects();
  }

  sortData(sort: any) {
    this.sortField = sort.active;
    this.sortDirection = sort.direction;
    this.loadProjects();
  }

  applyFilter() {
    this.loadProjects();
  }

  editRow(row: any) {
    row.isEdit = true;
  }

  saveRow(row: any) {
    this.projectService.updateProject(row.id, row).subscribe(
      (updatedProject) => {
        row.isEdit = false;
        this.dataSource.data = this.dataSource.data.map((proj) => proj.id === updatedProject.id ? updatedProject : proj);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Projects Updated', life: 3000});
      },
      (error) => {
        console.error('Error updating project:', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred while updating project.', life: 3000});

      }
    );
  }

  cancelEdit(row: any) {
    row.isEdit = false;
  }

  delete(id: number) {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter((proj) => proj.id !== id);
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000});
        },
        (error) => {
          console.error('Error deleting project:', error);
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'An error occurred while deleting project.', life: 3000});
        }
      );
    }
  }

  infos(element: any) {
    this.projectService.getProjectById(element.id!).subscribe({
      next: (projects) => {
        this.project = element;
      },
      error: () => {
      }
    });
    this.visible = true;
  }
}

