import { Provider } from '@angular/core';
import { EXPORT_REPOSITORY, SETTINGS_REPOSITORY, TRACKER_REPOSITORY } from './repository.tokens';
import {
  DEFAULT_TRACKER_DATABASE_NAME,
  TRACKER_DATABASE_NAME,
  TrackerDatabase,
} from '../indexeddb/tracker-database';
import { IndexedDbExportRepository } from '../repositories/indexeddb/indexeddb-export.repository';
import { IndexedDbSettingsRepository } from '../repositories/indexeddb/indexeddb-settings.repository';
import { IndexedDbTrackerRepository } from '../repositories/indexeddb/indexeddb-tracker.repository';

export const repositoryProviders: Provider[] = [
  TrackerDatabase,
  IndexedDbTrackerRepository,
  IndexedDbSettingsRepository,
  IndexedDbExportRepository,
  { provide: TRACKER_DATABASE_NAME, useValue: DEFAULT_TRACKER_DATABASE_NAME },
  { provide: TRACKER_REPOSITORY, useExisting: IndexedDbTrackerRepository },
  { provide: SETTINGS_REPOSITORY, useExisting: IndexedDbSettingsRepository },
  { provide: EXPORT_REPOSITORY, useExisting: IndexedDbExportRepository },
];
