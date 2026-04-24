import { TestBed } from '@angular/core/testing';
import { SETTINGS_REPOSITORY, TRACKER_REPOSITORY } from '../../data/providers/repository.tokens';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { TrackerRepository } from '../../domain/repositories/tracker.repository';
import { LoadHomeSummaryUseCase } from './load-home-summary.use-case';

describe('LoadHomeSummaryUseCase', () => {
  let trackerRepository: jasmine.SpyObj<TrackerRepository>;
  let settingsRepository: jasmine.SpyObj<SettingsRepository>;
  let useCase: LoadHomeSummaryUseCase;

  beforeEach(() => {
    trackerRepository = jasmine.createSpyObj<TrackerRepository>('TrackerRepository', ['listRecentCheckIns']);
    settingsRepository = jasmine.createSpyObj<SettingsRepository>('SettingsRepository', ['listWarningSigns']);

    TestBed.configureTestingModule({
      providers: [
        LoadHomeSummaryUseCase,
        { provide: TRACKER_REPOSITORY, useValue: trackerRepository },
        { provide: SETTINGS_REPOSITORY, useValue: settingsRepository },
      ],
    });

    useCase = TestBed.inject(LoadHomeSummaryUseCase);
  });

  it('returns the empty-state summary when no check-ins exist', async () => {
    trackerRepository.listRecentCheckIns.and.resolveTo([]);
    settingsRepository.listWarningSigns.and.resolveTo([
      {
        id: 'warning-sign-1',
        label: 'Brain fog',
        active: true,
        sortOrder: 1,
        createdAt: '2026-04-24T08:00:00.000Z',
      },
    ]);

    await expectAsync(useCase.execute()).toBeResolvedTo({
      title: 'Ready when you are',
      message: 'No check-ins yet. The tracker is set up to stay simple when you are ready to start.',
      latestCheckInDateKey: null,
      checkInCount: 0,
      warningSignCount: 1,
    });
  });

  it('returns the latest summary when check-ins exist', async () => {
    trackerRepository.listRecentCheckIns.and.resolveTo([
      {
        id: 'check-in-1',
        createdAt: '2026-04-24T08:00:00.000Z',
        dateKey: '2026-04-24',
        capacity: 'medium',
        restHelping: 'yes',
        mainStrain: 'sensory',
        selectedWarningSignIds: [],
      },
    ]);
    settingsRepository.listWarningSigns.and.resolveTo([]);

    await expectAsync(useCase.execute()).toBeResolvedTo({
      title: 'Tracker foundation is in place',
      message: 'The app can now load summary data through repository contracts instead of page-level storage code.',
      latestCheckInDateKey: '2026-04-24',
      checkInCount: 1,
      warningSignCount: 0,
    });
  });
});
