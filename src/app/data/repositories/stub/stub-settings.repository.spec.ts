import { RecoveryPlan } from '../../../domain/entities/recovery-plan';
import { UserSettings } from '../../../domain/entities/user-settings';
import { WarningSign } from '../../../domain/entities/warning-sign';
import { StubLocalStore } from './stub-local-store';
import { StubSettingsRepository } from './stub-settings.repository';

describe('StubSettingsRepository', () => {
  let store: StubLocalStore;
  let repository: StubSettingsRepository;

  beforeEach(() => {
    store = new StubLocalStore();
    repository = new StubSettingsRepository(store);
  });

  it('saves and loads user settings', async () => {
    const settings: UserSettings = {
      version: 1,
      theme: 'system',
      reducedStimulusMode: true,
      checkInReminderEnabled: false,
      onboardingCompleted: true,
    };

    await repository.saveUserSettings(settings);

    await expectAsync(repository.loadUserSettings()).toBeResolvedTo(settings);
  });

  it('saves and lists warning signs in sort order', async () => {
    const warningSigns: WarningSign[] = [
      {
        id: 'warning-sign-2',
        label: 'Noise feels sharp',
        active: true,
        sortOrder: 2,
        createdAt: '2026-04-24T08:00:00.000Z',
      },
      {
        id: 'warning-sign-1',
        label: 'Snapping at small things',
        active: true,
        sortOrder: 1,
        createdAt: '2026-04-24T07:00:00.000Z',
      },
    ];

    await repository.saveWarningSigns(warningSigns);

    await expectAsync(repository.listWarningSigns()).toBeResolvedTo([
      warningSigns[1],
      warningSigns[0],
    ]);
  });

  it('saves and loads the recovery plan', async () => {
    const recoveryPlan: RecoveryPlan = {
      id: 'recovery-plan-1',
      essentialTasks: ['Take medication'],
      essentialCare: ['Drink water'],
      deferList: ['Deep cleaning'],
      supportActions: ['Wear headphones'],
      updatedAt: '2026-04-24T08:00:00.000Z',
    };

    await repository.saveRecoveryPlan(recoveryPlan);

    await expectAsync(repository.loadRecoveryPlan()).toBeResolvedTo(recoveryPlan);
  });
});
