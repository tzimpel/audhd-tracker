import { CheckIn } from '../../../domain/entities/check-in';
import { WeeklyReflection } from '../../../domain/entities/weekly-reflection';
import { StubLocalStore } from './stub-local-store';
import { StubTrackerRepository } from './stub-tracker.repository';

describe('StubTrackerRepository', () => {
  let store: StubLocalStore;
  let repository: StubTrackerRepository;

  beforeEach(() => {
    store = new StubLocalStore();
    repository = new StubTrackerRepository(store);
  });

  it('saves and returns recent check-ins in descending createdAt order', async () => {
    const older: CheckIn = {
      id: 'check-in-1',
      createdAt: '2026-04-20T08:00:00.000Z',
      dateKey: '2026-04-20',
      capacity: 'low',
      restHelping: 'no',
      mainStrain: 'task-load',
      selectedWarningSignIds: [],
    };
    const newer: CheckIn = {
      ...older,
      id: 'check-in-2',
      createdAt: '2026-04-21T08:00:00.000Z',
      dateKey: '2026-04-21',
    };

    await repository.saveCheckIn(older);
    await repository.saveCheckIn(newer);

    await expectAsync(repository.listRecentCheckIns()).toBeResolvedTo([newer, older]);
    await expectAsync(repository.listRecentCheckIns(1)).toBeResolvedTo([newer]);
  });

  it('replaces a check-in when the id already exists', async () => {
    const original: CheckIn = {
      id: 'check-in-1',
      createdAt: '2026-04-21T08:00:00.000Z',
      dateKey: '2026-04-21',
      capacity: 'low',
      restHelping: 'no',
      mainStrain: 'task-load',
      selectedWarningSignIds: [],
    };
    const updated: CheckIn = {
      ...original,
      capacity: 'medium',
      notes: 'Updated',
    };

    await repository.saveCheckIn(original);
    await repository.saveCheckIn(updated);

    await expectAsync(repository.listRecentCheckIns()).toBeResolvedTo([updated]);
  });

  it('saves and lists weekly reflections', async () => {
    const reflection: WeeklyReflection = {
      id: 'reflection-1',
      weekKey: '2026-W17',
      drainedBy: ['social'],
      helpedBy: ['quiet'],
      warningSignsObserved: ['irritable'],
      nextWeekProtection: ['lighter schedule'],
      createdAt: '2026-04-24T08:00:00.000Z',
    };

    await repository.saveWeeklyReflection(reflection);

    await expectAsync(repository.listWeeklyReflections()).toBeResolvedTo([reflection]);
  });
});
