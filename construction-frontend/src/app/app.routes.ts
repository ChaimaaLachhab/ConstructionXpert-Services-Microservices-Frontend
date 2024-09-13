import {Routes} from '@angular/router';
import {LoginComponent} from "./features/authentication/login/login.component";
import {RegisterComponent} from "./features/authentication/register/register.component";
import {authGuard} from "./core/guards/auth.guard";
import {roleGuard} from "./core/guards/role.guard";
import {Role} from "./core/enums/role";
import {AdminDashboardComponent} from "./shared/admin-dashboard/admin-dashboard.component";
import {UserDashboardComponent} from "./shared/user-dashboard/user-dashboard.component";
import { ListResourceComponent } from './features/resource/list-resource/list-resource.component';
import { AddResourceComponent } from './features/resource/add-resource/add-resource.component';
import { AddTaskComponent } from './features/task/add-task/add-task.component';
import {LandingpageComponent} from "./shared/landingpage/landingpage.component";

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
  },
  { path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
  },
  { path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard, roleGuard([Role.CUSTOMER])]
  },
  {path: 'add-task',
    component: AddTaskComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
  },
  { path: 'add-resource',
    component: AddResourceComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
   },
  { path: 'list-resource',
    component: ListResourceComponent,
    canActivate: [authGuard, roleGuard([Role.ADMIN])]
   }
]

