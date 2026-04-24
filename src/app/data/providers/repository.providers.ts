import { Provider } from '@angular/core';
import { EXPORT_REPOSITORY, SETTINGS_REPOSITORY, TRACKER_REPOSITORY } from './repository.tokens';
import { StubExportRepository } from '../repositories/stub/stub-export.repository';
import { StubLocalStore } from '../repositories/stub/stub-local-store';
import { StubSettingsRepository } from '../repositories/stub/stub-settings.repository';
import { StubTrackerRepository } from '../repositories/stub/stub-tracker.repository';

export const repositoryProviders: Provider[] = [
  StubLocalStore,
  StubTrackerRepository,
  StubSettingsRepository,
  StubExportRepository,
  { provide: TRACKER_REPOSITORY, useExisting: StubTrackerRepository },
  { provide: SETTINGS_REPOSITORY, useExisting: StubSettingsRepository },
  { provide: EXPORT_REPOSITORY, useExisting: StubExportRepository },
];
