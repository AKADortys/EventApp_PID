import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthUserService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    const user = this.authService.getUser();

    if (!user) {
      this.router.navigate(['/']);
      return false;
    }

    switch (user.role) {
      case 'sportif':
        this.router.navigate(['/dashboard/profile/sportif']);
        break;
      case 'admin':
        this.router.navigate(['/dashboard/profile/admin']);
        break;
      case 'organisateur':
        this.router.navigate(['/dashboard/profile/organizer']);
        break;
      default:
        this.router.navigate(['/dashboard/home']);
    }

    return false;
  }
}
