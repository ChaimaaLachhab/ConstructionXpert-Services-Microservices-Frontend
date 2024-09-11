import { Component } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { Task, Status } from '../../../core/models/task.model';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  taskForm: FormGroup;
  statuses = Object.values(Status);

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [Status.TO_DO, Validators.required],
      projectId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      this.taskService.createTask(task).subscribe({
        next: (createdTask) => {
          console.log('Task created:', createdTask);
          // Reset form after creation
          this.taskForm.reset();
        },
        error: (error) => {
          console.error('Error creating task:', error);
        },
      });
    }
  }
}
