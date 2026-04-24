import { ExportEnvelope } from '../../../domain/export/export-envelope';
import { StubExportRepository } from './stub-export.repository';
import { StubLocalStore } from './stub-local-store';

describe('StubExportRepository', () => {
  let store: StubLocalStore;
  let repository: StubExportRepository;

  beforeEach(() => {
    store = new StubLocalStore();
    repository = new StubExportRepository(store);
  });

  it('exports versioned data from the shared store', async () => {
    store.setWarningSigns([
      {
        id: 'warning-sign-1',
        label: 'Tense shoulders',
        active: true,
        sortOrder: 1,
        createdAt: '2026-04-24T08:00:00.000Z',
      },
    ]);

    const exported = await repository.exportData();

    expect(exported.version).toBe(1);
    expect(exported.exportedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(exported.warningSigns.length).toBe(1);
  });

  it('imports a full dataset and makes it available for export', async () => {
    const imported: ExportEnvelope = {
      version: 1,
      exportedAt: '2026-04-24T08:00:00.000Z',
      checkIns: [
        {
          id: 'check-in-1',
          createdAt: '2026-04-24T08:00:00.000Z',
          dateKey: '2026-04-24',
          capacity: 'medium',
          restHelping: 'yes',
          mainStrain: 'sensory',
          selectedWarningSignIds: ['warning-sign-1'],
        },
      ],
      warningSigns: [
        {
          id: 'warning-sign-1',
          label: 'Brain fog',
          active: true,
          sortOrder: 1,
          createdAt: '2026-04-24T08:00:00.000Z',
        },
      ],
      weeklyReflections: [],
      recoveryPlan: null,
      userSettings: {
        version: 1,
        theme: 'system',
        reducedStimulusMode: false,
        checkInReminderEnabled: false,
      },
    };

    await repository.importData(imported);
    const exported = await repository.exportData();

    expect(exported.checkIns).toEqual(imported.checkIns);
    expect(exported.warningSigns).toEqual(imported.warningSigns);
    expect(exported.userSettings).toEqual(imported.userSettings);
  });
});
