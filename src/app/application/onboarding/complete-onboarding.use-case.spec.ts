import { TestBed } from '@angular/core/testing';
import { SETTINGS_REPOSITORY } from '../../data/providers/repository.tokens';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { CompleteOnboardingUseCase } from './complete-onboarding.use-case';

describe('CompleteOnboardingUseCase', () => {
  let settingsRepository: jasmine.SpyObj<SettingsRepository>;
  let useCase: CompleteOnboardingUseCase;

  beforeEach(() => {
    settingsRepository = jasmine.createSpyObj<SettingsRepository>('SettingsRepository', [
      'loadUserSettings',
      'saveUserSettings',
      'saveWarningSigns',
      'saveRecoveryPlan',
    ]);
    settingsRepository.loadUserSettings.and.resolveTo(null);
    settingsRepository.saveUserSettings.and.resolveTo();
    settingsRepository.saveWarningSigns.and.resolveTo();
    settingsRepository.saveRecoveryPlan.and.resolveTo();

    TestBed.configureTestingModule({
      providers: [
        CompleteOnboardingUseCase,
        { provide: SETTINGS_REPOSITORY, useValue: settingsRepository },
      ],
    });

    useCase = TestBed.inject(CompleteOnboardingUseCase);
  });

  it('persists onboarding state, warning signs, and recovery defaults', async () => {
    await useCase.execute({
      reducedStimulusMode: true,
      warningSigns: ['Noise feels sharp', 'Snapping at small things'],
      essentialTasks: ['Take medication'],
      essentialCare: ['Drink water'],
      supportActions: ['Wear headphones'],
    });

    expect(settingsRepository.saveUserSettings).toHaveBeenCalledWith(
      jasmine.objectContaining({
        reducedStimulusMode: true,
        onboardingCompleted: true,
      }),
    );
    expect(settingsRepository.saveWarningSigns).toHaveBeenCalledWith(
      jasmine.arrayContaining([
        jasmine.objectContaining({ label: 'Noise feels sharp', sortOrder: 1 }),
        jasmine.objectContaining({ label: 'Snapping at small things', sortOrder: 2 }),
      ]),
    );
    expect(settingsRepository.saveRecoveryPlan).toHaveBeenCalledWith(
      jasmine.objectContaining({
        essentialTasks: ['Take medication'],
        essentialCare: ['Drink water'],
        supportActions: ['Wear headphones'],
      }),
    );
  });
});
