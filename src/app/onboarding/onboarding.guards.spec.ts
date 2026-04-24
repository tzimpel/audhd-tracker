import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoadOnboardingStatusUseCase } from '../application/onboarding/load-onboarding-status.use-case';
import { homeOnboardingGuard, onboardingRouteGuard } from './onboarding.guards';

describe('onboarding guards', () => {
  let router: jasmine.SpyObj<Router>;
  let loadOnboardingStatus: jasmine.SpyObj<LoadOnboardingStatusUseCase>;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['parseUrl']);
    loadOnboardingStatus = jasmine.createSpyObj<LoadOnboardingStatusUseCase>('LoadOnboardingStatusUseCase', ['execute']);
    router.parseUrl.and.callFake((url: string) => ({ redirectedTo: url }) as never);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: LoadOnboardingStatusUseCase, useValue: loadOnboardingStatus },
      ],
    });
  });

  it('redirects home to onboarding when setup is incomplete', async () => {
    loadOnboardingStatus.execute.and.resolveTo(false);

    const result = await TestBed.runInInjectionContext(() => homeOnboardingGuard({} as never, []));

    expect(result).toEqual({ redirectedTo: '/onboarding' } as never);
  });

  it('redirects onboarding to home when setup is complete', async () => {
    loadOnboardingStatus.execute.and.resolveTo(true);

    const result = await TestBed.runInInjectionContext(() => onboardingRouteGuard({} as never, []));

    expect(result).toEqual({ redirectedTo: '/home' } as never);
  });
});
