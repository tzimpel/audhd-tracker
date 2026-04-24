import { TestBed } from '@angular/core/testing';
import { TRACKER_DATABASE_NAME, TrackerDatabase } from '../../indexeddb/tracker-database';
import { IndexedDbSettingsRepository } from './indexeddb-settings.repository';

describe('IndexedDbSettingsRepository', () => {
  let database: TrackerDatabase;
  let repository: IndexedDbSettingsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackerDatabase,
        IndexedDbSettingsRepository,
        { provide: TRACKER_DATABASE_NAME, useValue: `audhd-tracker-test-db-${crypto.randomUUID()}` },
      ],
    });

    database = TestBed.inject(TrackerDatabase);
    repository = TestBed.inject(IndexedDbSettingsRepository);
  });

  afterEach(async () => {
    await database.deleteDatabase();
  });

  it('saves and loads user settings', async () => {
    await repository.saveUserSettings({
      version: 1,
      theme: 'system',
      reducedStimulusMode: true,
      checkInReminderEnabled: false,
    });

    const settings = await repository.loadUserSettings();

    expect(settings?.reducedStimulusMode).toBeTrue();
  });

  it('saves warning signs and returns them in sort order', async () => {
    await repository.saveWarningSigns([
      {
        id: 'warning-sign-2',
        label: 'Noise feels sharp',
        active: true,
        sortOrder: 2,
        createdAt: '2026-04-24T08:00:00.000Z',
      },
      {
        id: 'warning-sign-1',
        label: 'Snapping at small things',
        active: true,
        sortOrder: 1,
        createdAt: '2026-04-24T07:00:00.000Z',
      },
    ]);

    const warningSigns = await repository.listWarningSigns();

    expect(warningSigns.map((warningSign) => warningSign.id)).toEqual([
      'warning-sign-1',
      'warning-sign-2',
    ]);
  });

  it('saves and loads the recovery plan', async () => {
    await repository.saveRecoveryPlan({
      id: 'recovery-plan-1',
      essentialTasks: ['Take medication'],
      essentialCare: ['Drink water'],
      deferList: ['Deep cleaning'],
      supportActions: ['Wear headphones'],
      updatedAt: '2026-04-24T08:00:00.000Z',
    });

    const recoveryPlan = await repository.loadRecoveryPlan();

    expect(recoveryPlan?.id).toBe('recovery-plan-1');
  });
});
