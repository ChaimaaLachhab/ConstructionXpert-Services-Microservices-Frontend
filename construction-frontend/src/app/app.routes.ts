import { Routes } from '@angular/router';
import { ListResourceComponent } from './features/resource/list-resource/list-resource.component';
import { AddResourceComponent } from './features/resource/add-resource/add-resource.component';
import { AddTaskComponent } from './features/task/add-task/add-task.component';

export const routes: Routes = [
  {path: 'add-task', component: AddTaskComponent},
  { path: 'add-resource', component: AddResourceComponent },
  { path: 'list-resource', component: ListResourceComponent },

];
