import { CheckIn } from '../entities/check-in';
import { WeeklyReflection } from '../entities/weekly-reflection';

export interface TrackerRepository {
  saveCheckIn(checkIn: CheckIn): Promise<void>;
  listRecentCheckIns(limit?: number): Promise<CheckIn[]>;
  saveWeeklyReflection(reflection: WeeklyReflection): Promise<void>;
  listWeeklyReflections(limit?: number): Promise<WeeklyReflection[]>;
}
