import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LoadOnboardingStatusUseCase } from '../application/onboarding/load-onboarding-status.use-case';

export const homeOnboardingGuard: CanMatchFn = async () => {
  const router = inject(Router);
  const loadOnboardingStatus = inject(LoadOnboardingStatusUseCase);
  const onboardingCompleted = await loadOnboardingStatus.execute();

  return onboardingCompleted ? true : router.parseUrl('/onboarding');
};

export const onboardingRouteGuard: CanMatchFn = async () => {
  const router = inject(Router);
  const loadOnboardingStatus = inject(LoadOnboardingStatusUseCase);
  const onboardingCompleted = await loadOnboardingStatus.execute();

  return onboardingCompleted ? router.parseUrl('/home') : true;
};
