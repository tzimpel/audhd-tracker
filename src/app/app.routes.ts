import { Routes } from '@angular/router';
import { homeOnboardingGuard, onboardingRouteGuard } from './onboarding/onboarding.guards';

export const routes: Routes = [
  {
    path: 'onboarding',
    canMatch: [onboardingRouteGuard],
    loadComponent: () => import('./onboarding/onboarding.page').then((m) => m.OnboardingPage),
  },
  {
    path: 'home',
    canMatch: [homeOnboardingGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
