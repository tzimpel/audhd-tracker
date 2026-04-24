import { CheckIn } from '../entities/check-in';
import { RecoveryPlan } from '../entities/recovery-plan';
import { UserSettings } from '../entities/user-settings';
import { WarningSign } from '../entities/warning-sign';
import { WeeklyReflection } from '../entities/weekly-reflection';

export type ExportEnvelopeVersion = 1;

export interface ExportEnvelope {
  version: ExportEnvelopeVersion;
  exportedAt: string;
  checkIns: CheckIn[];
  warningSigns: WarningSign[];
  weeklyReflections: WeeklyReflection[];
  recoveryPlan: RecoveryPlan | null;
  userSettings: UserSettings | null;
}
