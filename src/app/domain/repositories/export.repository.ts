import { ExportEnvelope } from '../export/export-envelope';

export interface ExportRepository {
  exportData(): Promise<ExportEnvelope>;
  importData(data: ExportEnvelope): Promise<void>;
}
