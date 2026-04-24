export type AppTheme = 'system' | 'light' | 'dark';

export interface UserSettings {
  version: number;
  theme: AppTheme;
  reducedStimulusMode: boolean;
  checkInReminderEnabled: boolean;
  preferredCheckInTime?: string;
  onboardingCompleted?: boolean;
}
