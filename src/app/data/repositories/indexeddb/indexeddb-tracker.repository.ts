import { Injectable, inject } from '@angular/core';
import { CheckIn } from '../../../domain/entities/check-in';
import { WeeklyReflection } from '../../../domain/entities/weekly-reflection';
import { TrackerRepository } from '../../../domain/repositories/tracker.repository';
import { TrackerDatabase, trackerStoreNames } from '../../indexeddb/tracker-database';

function byNewestCreatedAt<T extends { createdAt: string }>(left: T, right: T): number {
  return right.createdAt.localeCompare(left.createdAt);
}

@Injectable()
export class IndexedDbTrackerRepository implements TrackerRepository {
  private readonly database = inject(TrackerDatabase);

  async saveCheckIn(checkIn: CheckIn): Promise<void> {
    await this.database.putRecord(trackerStoreNames.checkIns, checkIn);
  }

  async listRecentCheckIns(limit?: number): Promise<CheckIn[]> {
    const checkIns = (await this.database.getAllRecords<CheckIn>(trackerStoreNames.checkIns)).sort(byNewestCreatedAt);
    return typeof limit === 'number' ? checkIns.slice(0, limit) : checkIns;
  }

  async saveWeeklyReflection(reflection: WeeklyReflection): Promise<void> {
    await this.database.putRecord(trackerStoreNames.weeklyReflections, reflection);
  }

  async listWeeklyReflections(limit?: number): Promise<WeeklyReflection[]> {
    const reflections = (
      await this.database.getAllRecords<WeeklyReflection>(trackerStoreNames.weeklyReflections)
    ).sort(byNewestCreatedAt);

    return typeof limit === 'number' ? reflections.slice(0, limit) : reflections;
  }
}
