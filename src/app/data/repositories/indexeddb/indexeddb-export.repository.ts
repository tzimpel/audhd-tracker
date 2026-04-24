import { Injectable, inject } from '@angular/core';
import { ExportEnvelope } from '../../../domain/export/export-envelope';
import { ExportRepository } from '../../../domain/repositories/export.repository';
import { RecoveryPlan } from '../../../domain/entities/recovery-plan';
import { UserSettings } from '../../../domain/entities/user-settings';
import {
  RECOVERY_PLAN_KEY,
  TrackerDatabase,
  trackerStoreNames,
  USER_SETTINGS_KEY,
} from '../../indexeddb/tracker-database';

@Injectable()
export class IndexedDbExportRepository implements ExportRepository {
  private readonly database = inject(TrackerDatabase);

  async exportData(): Promise<ExportEnvelope> {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      checkIns: await this.database.getAllRecords(trackerStoreNames.checkIns),
      warningSigns: await this.database.getAllRecords(trackerStoreNames.warningSigns),
      weeklyReflections: await this.database.getAllRecords(trackerStoreNames.weeklyReflections),
      recoveryPlan: await this.database.loadSingleton<RecoveryPlan>(RECOVERY_PLAN_KEY),
      userSettings: await this.database.loadSingleton<UserSettings>(USER_SETTINGS_KEY),
    };
  }

  async importData(data: ExportEnvelope): Promise<void> {
    await this.database.replaceStore(trackerStoreNames.checkIns, data.checkIns);
    await this.database.replaceStore(trackerStoreNames.warningSigns, data.warningSigns);
    await this.database.replaceStore(trackerStoreNames.weeklyReflections, data.weeklyReflections);
    await this.database.clearStore(trackerStoreNames.singletonRecords);

    if (data.userSettings) {
      await this.database.saveSingleton(USER_SETTINGS_KEY, data.userSettings);
    }

    if (data.recoveryPlan) {
      await this.database.saveSingleton(RECOVERY_PLAN_KEY, data.recoveryPlan);
    }
  }
}
