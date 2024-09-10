import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  // Check if the user is logged in
  if (authService.isLoggedIn()) {
    return true; // Allow access
  }

  // Redirect to the login page with the return URL
  router.navigate([''], { queryParams: { returnUrl: state.url } });
  return false; // Deny access
};
