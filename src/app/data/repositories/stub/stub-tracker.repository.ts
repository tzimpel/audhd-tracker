import { Injectable, inject } from '@angular/core';
import { CheckIn } from '../../../domain/entities/check-in';
import { WeeklyReflection } from '../../../domain/entities/weekly-reflection';
import { TrackerRepository } from '../../../domain/repositories/tracker.repository';
import { StubLocalStore } from './stub-local-store';

function byNewestDate<T extends { createdAt: string }>(left: T, right: T): number {
  return right.createdAt.localeCompare(left.createdAt);
}

@Injectable()
export class StubTrackerRepository implements TrackerRepository {
  private readonly store = inject(StubLocalStore);

  async saveCheckIn(checkIn: CheckIn): Promise<void> {
    const checkIns = this.store.getCheckIns().filter((entry) => entry.id !== checkIn.id);
    checkIns.push(checkIn);
    this.store.setCheckIns(checkIns);
  }

  async listRecentCheckIns(limit?: number): Promise<CheckIn[]> {
    const checkIns = this.store.getCheckIns().sort(byNewestDate);
    return typeof limit === 'number' ? checkIns.slice(0, limit) : checkIns;
  }

  async saveWeeklyReflection(reflection: WeeklyReflection): Promise<void> {
    const reflections = this.store
      .getWeeklyReflections()
      .filter((entry) => entry.id !== reflection.id);
    reflections.push(reflection);
    this.store.setWeeklyReflections(reflections);
  }

  async listWeeklyReflections(limit?: number): Promise<WeeklyReflection[]> {
    const reflections = this.store.getWeeklyReflections().sort(byNewestDate);
    return typeof limit === 'number' ? reflections.slice(0, limit) : reflections;
  }
}
