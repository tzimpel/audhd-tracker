import { TestBed } from '@angular/core/testing';
import { TRACKER_DATABASE_NAME, TrackerDatabase } from '../../indexeddb/tracker-database';
import { IndexedDbExportRepository } from './indexeddb-export.repository';

describe('IndexedDbExportRepository', () => {
  let database: TrackerDatabase;
  let repository: IndexedDbExportRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackerDatabase,
        IndexedDbExportRepository,
        { provide: TRACKER_DATABASE_NAME, useValue: `audhd-tracker-test-db-${crypto.randomUUID()}` },
      ],
    });

    database = TestBed.inject(TrackerDatabase);
    repository = TestBed.inject(IndexedDbExportRepository);
  });

  afterEach(async () => {
    await database.deleteDatabase();
  });

  it('exports the stored dataset with version metadata', async () => {
    await repository.importData({
      version: 1,
      exportedAt: '2026-04-24T08:00:00.000Z',
      checkIns: [],
      warningSigns: [
        {
          id: 'warning-sign-1',
          label: 'Brain fog',
          active: true,
          sortOrder: 1,
          createdAt: '2026-04-24T08:00:00.000Z',
        },
      ],
      weeklyReflections: [],
      recoveryPlan: null,
      userSettings: null,
    });

    const exported = await repository.exportData();

    expect(exported.version).toBe(1);
    expect(exported.exportedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(exported.warningSigns.length).toBe(1);
  });

  it('replaces the current dataset during import', async () => {
    await repository.importData({
      version: 1,
      exportedAt: '2026-04-24T08:00:00.000Z',
      checkIns: [
        {
          id: 'check-in-old',
          createdAt: '2026-04-23T08:00:00.000Z',
          dateKey: '2026-04-23',
          capacity: 'low',
          restHelping: 'no',
          mainStrain: 'task-load',
          selectedWarningSignIds: [],
        },
      ],
      warningSigns: [],
      weeklyReflections: [],
      recoveryPlan: null,
      userSettings: null,
    });

    await repository.importData({
      version: 1,
      exportedAt: '2026-04-24T08:00:00.000Z',
      checkIns: [
        {
          id: 'check-in-new',
          createdAt: '2026-04-24T08:00:00.000Z',
          dateKey: '2026-04-24',
          capacity: 'medium',
          restHelping: 'yes',
          mainStrain: 'sensory',
          selectedWarningSignIds: [],
        },
      ],
      warningSigns: [],
      weeklyReflections: [],
      recoveryPlan: null,
      userSettings: {
        version: 1,
        theme: 'system',
        reducedStimulusMode: false,
        checkInReminderEnabled: false,
      },
    });

    const exported = await repository.exportData();

    expect(exported.checkIns.map((checkIn) => checkIn.id)).toEqual(['check-in-new']);
    expect(exported.userSettings?.theme).toBe('system');
  });
});
