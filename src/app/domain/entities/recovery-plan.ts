export interface RecoveryPlan {
  id: string;
  essentialTasks: string[];
  essentialCare: string[];
  deferList: string[];
  supportActions: string[];
  updatedAt: string;
}
