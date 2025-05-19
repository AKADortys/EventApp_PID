import { Routes } from '@angular/router';
import { AuthComponent } from './components/pages/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { guestGuard } from './guards/guest-guard.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

export const routes: Routes = [
  { path: '', canActivate: [guestGuard], component: AuthComponent },
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [authGuardGuard],

    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
