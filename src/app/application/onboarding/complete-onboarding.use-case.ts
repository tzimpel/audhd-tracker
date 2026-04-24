import { Injectable, inject } from '@angular/core';
import { SETTINGS_REPOSITORY } from '../../data/providers/repository.tokens';
import { RecoveryPlan } from '../../domain/entities/recovery-plan';
import { UserSettings } from '../../domain/entities/user-settings';
import { WarningSign } from '../../domain/entities/warning-sign';
import { SettingsRepository } from '../../domain/repositories/settings.repository';

export interface CompleteOnboardingInput {
  reducedStimulusMode: boolean;
  warningSigns: string[];
  essentialTasks: string[];
  essentialCare: string[];
  supportActions: string[];
}

function toWarningSign(label: string, index: number): WarningSign {
  const trimmedLabel = label.trim();

  return {
    id: `warning-sign-${index + 1}-${trimmedLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    label: trimmedLabel,
    active: true,
    sortOrder: index + 1,
    createdAt: new Date().toISOString(),
  };
}

@Injectable({ providedIn: 'root' })
export class CompleteOnboardingUseCase {
  private readonly settingsRepository = inject<SettingsRepository>(SETTINGS_REPOSITORY);

  async execute(input: CompleteOnboardingInput): Promise<void> {
    const existingSettings = await this.settingsRepository.loadUserSettings();

    const settings: UserSettings = {
      version: existingSettings?.version ?? 1,
      theme: existingSettings?.theme ?? 'system',
      reducedStimulusMode: input.reducedStimulusMode,
      checkInReminderEnabled: existingSettings?.checkInReminderEnabled ?? false,
      preferredCheckInTime: existingSettings?.preferredCheckInTime,
      onboardingCompleted: true,
    };

    const recoveryPlan: RecoveryPlan = {
      id: 'default-recovery-plan',
      essentialTasks: input.essentialTasks,
      essentialCare: input.essentialCare,
      deferList: [],
      supportActions: input.supportActions,
      updatedAt: new Date().toISOString(),
    };

    const warningSigns = input.warningSigns
      .map((warningSign) => warningSign.trim())
      .filter((warningSign) => warningSign.length > 0)
      .map(toWarningSign);

    await Promise.all([
      this.settingsRepository.saveUserSettings(settings),
      this.settingsRepository.saveWarningSigns(warningSigns),
      this.settingsRepository.saveRecoveryPlan(recoveryPlan),
    ]);
  }
}
