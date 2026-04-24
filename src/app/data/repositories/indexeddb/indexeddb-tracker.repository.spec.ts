import { TestBed } from '@angular/core/testing';
import { TRACKER_DATABASE_NAME, TrackerDatabase } from '../../indexeddb/tracker-database';
import { IndexedDbTrackerRepository } from './indexeddb-tracker.repository';

describe('IndexedDbTrackerRepository', () => {
  let database: TrackerDatabase;
  let repository: IndexedDbTrackerRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackerDatabase,
        IndexedDbTrackerRepository,
        { provide: TRACKER_DATABASE_NAME, useValue: `audhd-tracker-test-db-${crypto.randomUUID()}` },
      ],
    });

    database = TestBed.inject(TrackerDatabase);
    repository = TestBed.inject(IndexedDbTrackerRepository);
  });

  afterEach(async () => {
    await database.deleteDatabase();
  });

  it('saves and returns check-ins in descending createdAt order', async () => {
    await repository.saveCheckIn({
      id: 'check-in-1',
      createdAt: '2026-04-20T08:00:00.000Z',
      dateKey: '2026-04-20',
      capacity: 'low',
      restHelping: 'no',
      mainStrain: 'task-load',
      selectedWarningSignIds: [],
    });
    await repository.saveCheckIn({
      id: 'check-in-2',
      createdAt: '2026-04-21T08:00:00.000Z',
      dateKey: '2026-04-21',
      capacity: 'medium',
      restHelping: 'yes',
      mainStrain: 'sensory',
      selectedWarningSignIds: [],
    });

    const checkIns = await repository.listRecentCheckIns();

    expect(checkIns.map((checkIn) => checkIn.id)).toEqual(['check-in-2', 'check-in-1']);
  });

  it('saves and lists weekly reflections', async () => {
    await repository.saveWeeklyReflection({
      id: 'reflection-1',
      weekKey: '2026-W17',
      drainedBy: ['social'],
      helpedBy: ['quiet'],
      warningSignsObserved: ['irritable'],
      nextWeekProtection: ['lighter schedule'],
      createdAt: '2026-04-24T08:00:00.000Z',
    });

    const reflections = await repository.listWeeklyReflections();

    expect(reflections.length).toBe(1);
    expect(reflections[0].id).toBe('reflection-1');
  });
});
