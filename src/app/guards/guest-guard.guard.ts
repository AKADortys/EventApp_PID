import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthUserService);
  const router = inject(Router);

  const user = authService.getUser();

  if (user) {
    return router.parseUrl('/dashboard/home');
  } else {
    return true;
  }
};
