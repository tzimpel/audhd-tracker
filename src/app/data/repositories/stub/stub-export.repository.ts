import { Injectable, inject } from '@angular/core';
import { ExportEnvelope } from '../../../domain/export/export-envelope';
import { ExportRepository } from '../../../domain/repositories/export.repository';
import { StubLocalStore } from './stub-local-store';

@Injectable()
export class StubExportRepository implements ExportRepository {
  private readonly store = inject(StubLocalStore);

  async exportData(): Promise<ExportEnvelope> {
    return this.store.exportDataset();
  }

  async importData(data: ExportEnvelope): Promise<void> {
    this.store.importDataset(data);
  }
}
