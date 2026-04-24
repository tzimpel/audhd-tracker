import { Capacity } from '../values/capacity';
import { MainStrain } from '../values/main-strain';
import { RestHelping } from '../values/rest-helping';

export interface CheckIn {
  id: string;
  createdAt: string;
  dateKey: string;
  capacity: Capacity;
  restHelping: RestHelping;
  mainStrain: MainStrain;
  selectedWarningSignIds: string[];
  secondarySignalType?: string;
  secondarySignalValue?: string;
  notes?: string;
}
