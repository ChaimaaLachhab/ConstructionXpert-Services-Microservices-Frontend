import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListTaskComponent implements OnInit {
  tasks: Task[] = [];
  projectId: number | null = null;
  errorMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // We don't fetch tasks here anymore
  }

  fetchTasksForProject(): void {
    if (this.projectId === null) {
      this.errorMessage = 'Please enter a valid project ID';
      return;
    }

    this.taskService.getTasksByProjectId(this.projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Error fetching tasks. Please try again.';
      },
    });
  }
}
