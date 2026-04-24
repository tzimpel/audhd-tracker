export interface WeeklyReflection {
  id: string;
  weekKey: string;
  drainedBy: string[];
  helpedBy: string[];
  warningSignsObserved: string[];
  nextWeekProtection: string[];
  createdAt: string;
}
