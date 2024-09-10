import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (_route, state) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    // Check if the user is logged in
    if (!authService.isLoggedIn()) {
      // Redirect to the login page with the return URL
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false; // Deny access
    }

    // Check if the user has one of the allowed roles
    if (allowedRoles.some(role => authService.hasRole(role))) {
      return true; // Allow access
    }

    // Redirect to the unauthorized page
    router.navigate(['/unauthorized']);
    return false; // Deny access
  };
};
