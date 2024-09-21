import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task} from "../models/task.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/TASK-SERVICE/api/tasks`;

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, task).pipe(
      catchError(this.handleError<Task>('createTask'))
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError<Task[]>('getAllTasks', []))
    );
  }

  getTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`).pipe(
      catchError(this.handleError<Task[]>('getTasksByProjectId', []))
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Task>(`getTaskById id=${id}`))
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      catchError(this.handleError<Task>('updateTask'))
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<void>('deleteTask'))
    );
  }

  taskExists(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/exist`).pipe(
      catchError(this.handleError<boolean>('taskExists', false))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
