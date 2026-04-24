import { RecoveryPlan } from '../entities/recovery-plan';
import { UserSettings } from '../entities/user-settings';
import { WarningSign } from '../entities/warning-sign';

export interface SettingsRepository {
  loadUserSettings(): Promise<UserSettings | null>;
  saveUserSettings(settings: UserSettings): Promise<void>;
  listWarningSigns(): Promise<WarningSign[]>;
  saveWarningSigns(signs: WarningSign[]): Promise<void>;
  loadRecoveryPlan(): Promise<RecoveryPlan | null>;
  saveRecoveryPlan(plan: RecoveryPlan): Promise<void>;
}
