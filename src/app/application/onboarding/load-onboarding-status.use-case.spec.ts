import { TestBed } from '@angular/core/testing';
import { SETTINGS_REPOSITORY } from '../../data/providers/repository.tokens';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { LoadOnboardingStatusUseCase } from './load-onboarding-status.use-case';

describe('LoadOnboardingStatusUseCase', () => {
  let settingsRepository: jasmine.SpyObj<SettingsRepository>;
  let useCase: LoadOnboardingStatusUseCase;

  beforeEach(() => {
    settingsRepository = jasmine.createSpyObj<SettingsRepository>('SettingsRepository', ['loadUserSettings']);

    TestBed.configureTestingModule({
      providers: [
        LoadOnboardingStatusUseCase,
        { provide: SETTINGS_REPOSITORY, useValue: settingsRepository },
      ],
    });

    useCase = TestBed.inject(LoadOnboardingStatusUseCase);
  });

  it('returns false when settings do not exist yet', async () => {
    settingsRepository.loadUserSettings.and.resolveTo(null);

    await expectAsync(useCase.execute()).toBeResolvedTo(false);
  });

  it('returns true when onboarding is complete', async () => {
    settingsRepository.loadUserSettings.and.resolveTo({
      version: 1,
      theme: 'system',
      reducedStimulusMode: false,
      checkInReminderEnabled: false,
      onboardingCompleted: true,
    });

    await expectAsync(useCase.execute()).toBeResolvedTo(true);
  });
});
