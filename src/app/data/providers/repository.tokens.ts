import { InjectionToken } from '@angular/core';
import { ExportRepository } from '../../domain/repositories/export.repository';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { TrackerRepository } from '../../domain/repositories/tracker.repository';

export const TRACKER_REPOSITORY = new InjectionToken<TrackerRepository>('TRACKER_REPOSITORY');
export const SETTINGS_REPOSITORY = new InjectionToken<SettingsRepository>('SETTINGS_REPOSITORY');
export const EXPORT_REPOSITORY = new InjectionToken<ExportRepository>('EXPORT_REPOSITORY');
