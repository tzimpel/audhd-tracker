import { Injectable, inject } from '@angular/core';
import { RecoveryPlan } from '../../../domain/entities/recovery-plan';
import { UserSettings } from '../../../domain/entities/user-settings';
import { WarningSign } from '../../../domain/entities/warning-sign';
import { SettingsRepository } from '../../../domain/repositories/settings.repository';
import { StubLocalStore } from './stub-local-store';

@Injectable()
export class StubSettingsRepository implements SettingsRepository {
  private readonly store = inject(StubLocalStore);

  async loadUserSettings(): Promise<UserSettings | null> {
    return this.store.getUserSettings();
  }

  async saveUserSettings(settings: UserSettings): Promise<void> {
    this.store.setUserSettings(settings);
  }

  async listWarningSigns(): Promise<WarningSign[]> {
    return this.store.getWarningSigns().sort((left, right) => left.sortOrder - right.sortOrder);
  }

  async saveWarningSigns(signs: WarningSign[]): Promise<void> {
    this.store.setWarningSigns(signs);
  }

  async loadRecoveryPlan(): Promise<RecoveryPlan | null> {
    return this.store.getRecoveryPlan();
  }

  async saveRecoveryPlan(plan: RecoveryPlan): Promise<void> {
    this.store.setRecoveryPlan(plan);
  }
}
