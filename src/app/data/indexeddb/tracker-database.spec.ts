import { TestBed } from '@angular/core/testing';
import {
  TRACKER_DATABASE_NAME,
  TrackerDatabase,
  trackerStoreNames,
} from './tracker-database';

describe('TrackerDatabase', () => {
  let databaseName: string;
  let database: TrackerDatabase;

  beforeEach(() => {
    databaseName = `audhd-tracker-test-db-${crypto.randomUUID()}`;

    TestBed.configureTestingModule({
      providers: [
        TrackerDatabase,
        { provide: TRACKER_DATABASE_NAME, useValue: databaseName },
      ],
    });

    database = TestBed.inject(TrackerDatabase);
  });

  afterEach(async () => {
    await database.deleteDatabase();
  });

  it('creates the expected stores during initialization', async () => {
    const indexedDb = await database.getDatabase();

    expect(indexedDb.objectStoreNames.contains(trackerStoreNames.checkIns)).toBeTrue();
    expect(indexedDb.objectStoreNames.contains(trackerStoreNames.warningSigns)).toBeTrue();
    expect(indexedDb.objectStoreNames.contains(trackerStoreNames.weeklyReflections)).toBeTrue();
    expect(indexedDb.objectStoreNames.contains(trackerStoreNames.singletonRecords)).toBeTrue();
  });
});
