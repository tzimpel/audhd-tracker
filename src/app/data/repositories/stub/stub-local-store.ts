import { Injectable } from '@angular/core';
import { CheckIn } from '../../../domain/entities/check-in';
import { RecoveryPlan } from '../../../domain/entities/recovery-plan';
import { UserSettings } from '../../../domain/entities/user-settings';
import { WarningSign } from '../../../domain/entities/warning-sign';
import { WeeklyReflection } from '../../../domain/entities/weekly-reflection';
import { ExportEnvelope } from '../../../domain/export/export-envelope';

interface StubDataset {
  checkIns: CheckIn[];
  warningSigns: WarningSign[];
  weeklyReflections: WeeklyReflection[];
  recoveryPlan: RecoveryPlan | null;
  userSettings: UserSettings | null;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function emptyDataset(): StubDataset {
  return {
    checkIns: [],
    warningSigns: [],
    weeklyReflections: [],
    recoveryPlan: null,
    userSettings: null,
  };
}

@Injectable()
export class StubLocalStore {
  private dataset: StubDataset = emptyDataset();

  getCheckIns(): CheckIn[] {
    return clone(this.dataset.checkIns);
  }

  setCheckIns(checkIns: CheckIn[]): void {
    this.dataset.checkIns = clone(checkIns);
  }

  getWarningSigns(): WarningSign[] {
    return clone(this.dataset.warningSigns);
  }

  setWarningSigns(warningSigns: WarningSign[]): void {
    this.dataset.warningSigns = clone(warningSigns);
  }

  getWeeklyReflections(): WeeklyReflection[] {
    return clone(this.dataset.weeklyReflections);
  }

  setWeeklyReflections(reflections: WeeklyReflection[]): void {
    this.dataset.weeklyReflections = clone(reflections);
  }

  getRecoveryPlan(): RecoveryPlan | null {
    return clone(this.dataset.recoveryPlan);
  }

  setRecoveryPlan(recoveryPlan: RecoveryPlan | null): void {
    this.dataset.recoveryPlan = clone(recoveryPlan);
  }

  getUserSettings(): UserSettings | null {
    return clone(this.dataset.userSettings);
  }

  setUserSettings(userSettings: UserSettings | null): void {
    this.dataset.userSettings = clone(userSettings);
  }

  exportDataset(): ExportEnvelope {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      checkIns: this.getCheckIns(),
      warningSigns: this.getWarningSigns(),
      weeklyReflections: this.getWeeklyReflections(),
      recoveryPlan: this.getRecoveryPlan(),
      userSettings: this.getUserSettings(),
    };
  }

  importDataset(dataset: ExportEnvelope): void {
    this.dataset = {
      checkIns: clone(dataset.checkIns),
      warningSigns: clone(dataset.warningSigns),
      weeklyReflections: clone(dataset.weeklyReflections),
      recoveryPlan: clone(dataset.recoveryPlan),
      userSettings: clone(dataset.userSettings),
    };
  }

  reset(): void {
    this.dataset = emptyDataset();
  }
}
