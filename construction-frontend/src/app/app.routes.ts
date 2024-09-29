import {Routes} from '@angular/router';
import {LoginComponent} from "./features/authentication/login/login.component";
import {RegisterComponent} from "./features/authentication/register/register.component";
import {authGuard} from "./core/guards/auth.guard";
import {roleGuard} from "./core/guards/role.guard";
import {Role} from "./core/enums/role";
import { ListResourceComponent } from './features/resource/list-resource/list-resource.component';
import { AddResourceComponent } from './features/resource/add-resource/add-resource.component';
import { AddTaskComponent } from './features/task/add-task/add-task.component';
import {LandingpageComponent} from "./shared/landingpage/landingpage.component";
import {DashboardComponent} from "./shared/dashboard/dashboard.component";
import {FilterProjectsComponent} from "./features/project/filter-projects/filter-projects.component";
import {Status} from "./core/enums/status";
import {StatsComponent} from "./shared/dashboard/stats/stats.component";
import { ListTaskComponent } from './features/task/list-task/list-task.component';

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: StatsComponent,
      },
      {
        path: 'projects',
        component: FilterProjectsComponent
      },
      {
        path: 'tasks',
        component: AddTaskComponent
      },
      {
        path: 'resources',
        component: ListResourceComponent
      },
    ]
  },

  {path: 'add-task',
    component: AddTaskComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
  },
  {path: 'list-task',
    component: ListTaskComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
  },
  { path: 'add-resource',
    component: AddResourceComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
   },
  { path: 'list-resource',
    component: ListResourceComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
   },
]

