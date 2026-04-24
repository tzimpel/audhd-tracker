import { Injectable, inject } from '@angular/core';
import { SETTINGS_REPOSITORY } from '../../data/providers/repository.tokens';
import { RecoveryPlan } from '../../domain/entities/recovery-plan';
import { UserSettings } from '../../domain/entities/user-settings';
import { WarningSign } from '../../domain/entities/warning-sign';
import { SettingsRepository } from '../../domain/repositories/settings.repository';

export interface OnboardingState {
  settings: UserSettings;
  warningSigns: WarningSign[];
  recoveryPlan: RecoveryPlan;
}

function createDefaultSettings(existing: UserSettings | null): UserSettings {
  return {
    version: existing?.version ?? 1,
    theme: existing?.theme ?? 'system',
    reducedStimulusMode: existing?.reducedStimulusMode ?? false,
    checkInReminderEnabled: existing?.checkInReminderEnabled ?? false,
    preferredCheckInTime: existing?.preferredCheckInTime,
    onboardingCompleted: existing?.onboardingCompleted ?? false,
  };
}

function createDefaultRecoveryPlan(existing: RecoveryPlan | null): RecoveryPlan {
  return {
    id: existing?.id ?? 'default-recovery-plan',
    essentialTasks: existing?.essentialTasks ?? [],
    essentialCare: existing?.essentialCare ?? [],
    deferList: existing?.deferList ?? [],
    supportActions: existing?.supportActions ?? [],
    updatedAt: existing?.updatedAt ?? new Date().toISOString(),
  };
}

@Injectable({ providedIn: 'root' })
export class LoadOnboardingStateUseCase {
  private readonly settingsRepository = inject<SettingsRepository>(SETTINGS_REPOSITORY);

  async execute(): Promise<OnboardingState> {
    const [settings, warningSigns, recoveryPlan] = await Promise.all([
      this.settingsRepository.loadUserSettings(),
      this.settingsRepository.listWarningSigns(),
      this.settingsRepository.loadRecoveryPlan(),
    ]);

    return {
      settings: createDefaultSettings(settings),
      warningSigns,
      recoveryPlan: createDefaultRecoveryPlan(recoveryPlan),
    };
  }
}
