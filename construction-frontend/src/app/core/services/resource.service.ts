import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {Resource} from "../models/resource.model";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = `${environment.apiUrl}/RESOURCE-SERVICE/api/resources`;

  constructor(private http: HttpClient) {}

  // Create a new resource (Admin only)
  createResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}`, resource).pipe(
      catchError(this.handleError<Resource>('createResource'))
    );
  }

  // Get all resources (Admin and Customer)
  getAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError<Resource[]>('getAllResources', []))
    );
  }

  // Get resources by task ID (Admin and Customer)
  getResourcesByTaskId(taskId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/task/${taskId}`).pipe(
      catchError(this.handleError<Resource[]>('getResourcesByTaskId', []))
    );
  }

  // Update a resource (Admin only)
  updateResource(id: number, resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}/resource/${id}`, resource).pipe(
      catchError(this.handleError<Resource>('updateResource'))
    );
  }

  // Delete a resource (Admin only)
  deleteResource(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<void>('deleteResource'))
    );
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
