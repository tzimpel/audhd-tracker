import { Injectable, inject } from '@angular/core';
import { SETTINGS_REPOSITORY } from '../../data/providers/repository.tokens';
import { SettingsRepository } from '../../domain/repositories/settings.repository';

@Injectable({ providedIn: 'root' })
export class LoadOnboardingStatusUseCase {
  private readonly settingsRepository = inject<SettingsRepository>(SETTINGS_REPOSITORY);

  async execute(): Promise<boolean> {
    const settings = await this.settingsRepository.loadUserSettings();
    return settings?.onboardingCompleted === true;
  }
}
