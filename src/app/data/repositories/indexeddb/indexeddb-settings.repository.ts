import { Injectable, inject } from '@angular/core';
import { RecoveryPlan } from '../../../domain/entities/recovery-plan';
import { UserSettings } from '../../../domain/entities/user-settings';
import { WarningSign } from '../../../domain/entities/warning-sign';
import { SettingsRepository } from '../../../domain/repositories/settings.repository';
import {
  RECOVERY_PLAN_KEY,
  TrackerDatabase,
  trackerStoreNames,
  USER_SETTINGS_KEY,
} from '../../indexeddb/tracker-database';

@Injectable()
export class IndexedDbSettingsRepository implements SettingsRepository {
  private readonly database = inject(TrackerDatabase);

  async loadUserSettings(): Promise<UserSettings | null> {
    return this.database.loadSingleton<UserSettings>(USER_SETTINGS_KEY);
  }

  async saveUserSettings(settings: UserSettings): Promise<void> {
    await this.database.saveSingleton(USER_SETTINGS_KEY, settings);
  }

  async listWarningSigns(): Promise<WarningSign[]> {
    return (await this.database.getAllRecords<WarningSign>(trackerStoreNames.warningSigns)).sort(
      (left, right) => left.sortOrder - right.sortOrder,
    );
  }

  async saveWarningSigns(signs: WarningSign[]): Promise<void> {
    await this.database.replaceStore(trackerStoreNames.warningSigns, signs);
  }

  async loadRecoveryPlan(): Promise<RecoveryPlan | null> {
    return this.database.loadSingleton<RecoveryPlan>(RECOVERY_PLAN_KEY);
  }

  async saveRecoveryPlan(plan: RecoveryPlan): Promise<void> {
    await this.database.saveSingleton(RECOVERY_PLAN_KEY, plan);
  }
}
