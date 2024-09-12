import {Routes} from '@angular/router';
import {LoginComponent} from "./features/authentication/login/login.component";
import {RegisterComponent} from "./features/authentication/register/register.component";
import {authGuard} from "./core/guards/auth.guard";
import {roleGuard} from "./core/guards/role.guard";
import {Role} from "./core/enums/role";
import {AdminDashboardComponent} from "./shared/admin-dashboard/admin-dashboard.component";
import {UserDashboardComponent} from "./shared/user-dashboard/user-dashboard.component";

export const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
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
  }
];
