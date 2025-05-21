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

export const routes: Routes = [
  { path: '', canActivate: [guestGuard], component: AuthComponent },
  {
    path: 'dashboard',
    canActivate: [authGuardGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'profile',
        canActivate: [RoleGuard],
        component: ProfileComponent,
      },
      { path: 'profile/sportif', component: SportifProfileComponent },
      { path: 'profile/admin', component: AdminProfileComponent },
      { path: 'profile/organizer', component: OrganizerProfileComponent },
      { path: 'events/:id', component: EventComponent },
      { path: 'params', component: ParamsUserComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
