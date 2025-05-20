import { Routes } from '@angular/router';
import { AuthComponent } from './components/pages/auth/auth.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { guestGuard } from './guards/guest-guard.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { AppComponent } from './app.component';
import { EventComponent } from './components/pages/event/event.component';
import { ParamsUserComponent } from './components/pages/params-user/params-user.component';

export const routes: Routes = [
  { path: '', canActivate: [guestGuard], component: AuthComponent },
  {
    path: 'dashboard',
    component: AppComponent,
    canActivate: [authGuardGuard],

    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'events/:id', component: EventComponent },
      { path: 'params', component: ParamsUserComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
