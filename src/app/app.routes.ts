import { Routes } from '@angular/router';
import { AuthComponent } from './components/pages/auth/auth.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { guestGuard } from './guards/guest-guard.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { EventComponent } from './components/pages/event/event.component';
import { ParamsUserComponent } from './components/pages/params-user/params-user.component';
import { RoleGuard } from './guards/role.guard';
import { SportifProfileComponent } from './components/pages/sportif-profile/sportif-profile.component';
import { AdminProfileComponent } from './components/pages/admin-profile/admin-profile.component';
import { OrganizerProfileComponent } from './components/pages/organizer-profile/organizer-profile.component';
import { EventFormComponent } from './components/partials/event/event-form/event-form.component';
import { UserComponent } from './components/pages/user/user.component';
import { RegisterFormAthComponent } from './components/partials/register-form-ath/register-form-ath.component';

export const routes: Routes = [
  { path: '', canActivate: [guestGuard], component: AuthComponent },
  {
    path: 'register',
    canActivate: [guestGuard],
    component: RegisterFormAthComponent,
  },
  {
    path: 'dashboard',
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'user/:id',
        component: UserComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'profile',
        canActivate: [authGuardGuard, RoleGuard],
        component: ProfileComponent,
      },
      {
        path: 'profile/sportif',
        component: SportifProfileComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'profile/admin',
        component: AdminProfileComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'profile/organizer',
        component: OrganizerProfileComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'events',
        children: [
          {
            path: 'new',
            component: EventFormComponent,
            canActivate: [authGuardGuard],
          },
          {
            path: 'edit/:id',
            component: EventFormComponent,
            canActivate: [authGuardGuard],
          },
          { path: ':id', component: EventComponent },
        ],
      },

      {
        path: 'params',
        component: ParamsUserComponent,
        canActivate: [authGuardGuard],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
