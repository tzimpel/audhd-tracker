import { Inject, Injectable } from '@angular/core';
import { SETTINGS_REPOSITORY, TRACKER_REPOSITORY } from '../../data/providers/repository.tokens';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { TrackerRepository } from '../../domain/repositories/tracker.repository';

export interface HomeSummary {
  title: string;
  message: string;
  latestCheckInDateKey: string | null;
  checkInCount: number;
  warningSignCount: number;
}

@Injectable({ providedIn: 'root' })
export class LoadHomeSummaryUseCase {
  constructor(
    @Inject(TRACKER_REPOSITORY) private readonly trackerRepository: TrackerRepository,
    @Inject(SETTINGS_REPOSITORY) private readonly settingsRepository: SettingsRepository,
  ) {}

  async execute(): Promise<HomeSummary> {
    const [checkIns, warningSigns] = await Promise.all([
      this.trackerRepository.listRecentCheckIns(),
      this.settingsRepository.listWarningSigns(),
    ]);
    const latestCheckIn = checkIns[0] ?? null;

    if (!latestCheckIn) {
      return {
        title: 'Ready when you are',
        message: 'No check-ins yet. The tracker is set up to stay simple when you are ready to start.',
        latestCheckInDateKey: null,
        checkInCount: 0,
        warningSignCount: warningSigns.length,
      };
    }

    return {
      title: 'Tracker foundation is in place',
      message: 'The app can now load summary data through repository contracts instead of page-level storage code.',
      latestCheckInDateKey: latestCheckIn.dateKey,
      checkInCount: checkIns.length,
      warningSignCount: warningSigns.length,
    };
  }
}
