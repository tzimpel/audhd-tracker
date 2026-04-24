import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CompleteOnboardingUseCase } from '../application/onboarding/complete-onboarding.use-case';
import { LoadOnboardingStateUseCase } from '../application/onboarding/load-onboarding-state.use-case';
import { OnboardingPage } from './onboarding.page';

describe('OnboardingPage', () => {
  let component: OnboardingPage;
  let fixture: ComponentFixture<OnboardingPage>;
  let loadOnboardingState: jasmine.SpyObj<LoadOnboardingStateUseCase>;
  let completeOnboarding: jasmine.SpyObj<CompleteOnboardingUseCase>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    loadOnboardingState = jasmine.createSpyObj<LoadOnboardingStateUseCase>('LoadOnboardingStateUseCase', ['execute']);
    completeOnboarding = jasmine.createSpyObj<CompleteOnboardingUseCase>('CompleteOnboardingUseCase', ['execute']);
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    loadOnboardingState.execute.and.resolveTo({
      settings: {
        version: 1,
        theme: 'system',
        reducedStimulusMode: false,
        checkInReminderEnabled: false,
        onboardingCompleted: false,
      },
      warningSigns: [
        {
          id: 'warning-sign-1',
          label: 'Noise feels sharp',
          active: true,
          sortOrder: 1,
          createdAt: '2026-04-25T08:00:00.000Z',
        },
      ],
      recoveryPlan: {
        id: 'default-recovery-plan',
        essentialTasks: ['Take medication'],
        essentialCare: ['Drink water'],
        deferList: [],
        supportActions: ['Wear headphones'],
        updatedAt: '2026-04-25T08:00:00.000Z',
      },
    });
    completeOnboarding.execute.and.resolveTo();
    router.navigateByUrl.and.resolveTo(true);

    await TestBed.configureTestingModule({
      imports: [OnboardingPage],
      providers: [
        { provide: LoadOnboardingStateUseCase, useValue: loadOnboardingState },
        { provide: CompleteOnboardingUseCase, useValue: completeOnboarding },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('loads saved onboarding state', () => {
    expect(component.warningSigns).toEqual(['Noise feels sharp']);
    expect(component.essentialTasksText).toBe('Take medication');
    expect(component.supportActionsText).toBe('Wear headphones');
  });

  it('adds, reorders, and removes warning signs', () => {
    component.newWarningSign = 'Snapping at small things';
    component.addWarningSign();

    expect(component.warningSigns).toEqual(['Noise feels sharp', 'Snapping at small things']);

    component.moveWarningSignUp(1);
    expect(component.warningSigns).toEqual(['Snapping at small things', 'Noise feels sharp']);

    component.removeWarningSign(1);
    expect(component.warningSigns).toEqual(['Snapping at small things']);
  });

  it('finishes onboarding and routes home', async () => {
    component.warningSigns = ['Noise feels sharp'];
    component.essentialTasksText = 'Take medication';
    component.essentialCareText = 'Drink water';
    component.supportActionsText = 'Wear headphones';
    component.reducedStimulusMode = true;

    await component.finishSetup();

    expect(completeOnboarding.execute).toHaveBeenCalledWith({
      reducedStimulusMode: true,
      warningSigns: ['Noise feels sharp'],
      essentialTasks: ['Take medication'],
      essentialCare: ['Drink water'],
      supportActions: ['Wear headphones'],
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });
});
