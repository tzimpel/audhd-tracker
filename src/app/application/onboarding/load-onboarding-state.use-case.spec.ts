import { TestBed } from '@angular/core/testing';
import { SETTINGS_REPOSITORY } from '../../data/providers/repository.tokens';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { LoadOnboardingStateUseCase } from './load-onboarding-state.use-case';

describe('LoadOnboardingStateUseCase', () => {
  let settingsRepository: jasmine.SpyObj<SettingsRepository>;
  let useCase: LoadOnboardingStateUseCase;

  beforeEach(() => {
    settingsRepository = jasmine.createSpyObj<SettingsRepository>('SettingsRepository', [
      'loadUserSettings',
      'listWarningSigns',
      'loadRecoveryPlan',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LoadOnboardingStateUseCase,
        { provide: SETTINGS_REPOSITORY, useValue: settingsRepository },
      ],
    });

    useCase = TestBed.inject(LoadOnboardingStateUseCase);
  });

  it('returns safe defaults when no onboarding data exists', async () => {
    settingsRepository.loadUserSettings.and.resolveTo(null);
    settingsRepository.listWarningSigns.and.resolveTo([]);
    settingsRepository.loadRecoveryPlan.and.resolveTo(null);

    const state = await useCase.execute();

    expect(state.settings).toEqual({
      version: 1,
      theme: 'system',
      reducedStimulusMode: false,
      checkInReminderEnabled: false,
      preferredCheckInTime: undefined,
      onboardingCompleted: false,
    });
    expect(state.warningSigns).toEqual([]);
    expect(state.recoveryPlan.id).toBe('default-recovery-plan');
    expect(state.recoveryPlan.essentialTasks).toEqual([]);
    expect(state.recoveryPlan.essentialCare).toEqual([]);
    expect(state.recoveryPlan.deferList).toEqual([]);
    expect(state.recoveryPlan.supportActions).toEqual([]);
    expect(state.recoveryPlan.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
