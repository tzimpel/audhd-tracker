import { Injectable, InjectionToken, inject } from '@angular/core';

export const TRACKER_DATABASE_NAME = new InjectionToken<string>('TRACKER_DATABASE_NAME');
export const DEFAULT_TRACKER_DATABASE_NAME = 'audhd-tracker';
export const TRACKER_DATABASE_VERSION = 1;

const CHECK_INS_STORE = 'check_ins';
const WARNING_SIGNS_STORE = 'warning_signs';
const WEEKLY_REFLECTIONS_STORE = 'weekly_reflections';
const SINGLETON_RECORDS_STORE = 'singleton_records';

export const USER_SETTINGS_KEY = 'user_settings';
export const RECOVERY_PLAN_KEY = 'recovery_plan';

interface SingletonRecord<T> {
  key: string;
  value: T;
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
  });
}

function transactionToPromise(transaction: IDBTransaction): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB transaction failed'));
    transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB transaction aborted'));
  });
}

@Injectable({ providedIn: 'root' })
export class TrackerDatabase {
  private readonly databaseName = inject<string>(TRACKER_DATABASE_NAME);
  private databasePromise: Promise<IDBDatabase> | null = null;

  getDatabase(): Promise<IDBDatabase> {
    if (!this.databasePromise) {
      this.databasePromise = this.openDatabase();
    }

    return this.databasePromise;
  }

  async putRecord<T>(storeName: string, value: T): Promise<void> {
    const database = await this.getDatabase();
    const transaction = database.transaction(storeName, 'readwrite');
    transaction.objectStore(storeName).put(value);
    await transactionToPromise(transaction);
  }

  async getRecord<T>(storeName: string, key: IDBValidKey): Promise<T | null> {
    const database = await this.getDatabase();
    const transaction = database.transaction(storeName, 'readonly');
    const record = await requestToPromise<T | undefined>(transaction.objectStore(storeName).get(key));
    await transactionToPromise(transaction);
    return record ?? null;
  }

  async getAllRecords<T>(storeName: string): Promise<T[]> {
    const database = await this.getDatabase();
    const transaction = database.transaction(storeName, 'readonly');
    const records = await requestToPromise<T[]>(transaction.objectStore(storeName).getAll());
    await transactionToPromise(transaction);
    return records;
  }

  async saveSingleton<T>(key: string, value: T): Promise<void> {
    await this.putRecord<SingletonRecord<T>>(SINGLETON_RECORDS_STORE, { key, value });
  }

  async loadSingleton<T>(key: string): Promise<T | null> {
    const record = await this.getRecord<SingletonRecord<T>>(SINGLETON_RECORDS_STORE, key);
    return record?.value ?? null;
  }

  async clearStore(storeName: string): Promise<void> {
    const database = await this.getDatabase();
    const transaction = database.transaction(storeName, 'readwrite');
    transaction.objectStore(storeName).clear();
    await transactionToPromise(transaction);
  }

  async replaceStore<T>(storeName: string, values: T[]): Promise<void> {
    const database = await this.getDatabase();
    const transaction = database.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.clear();
    values.forEach((value) => store.put(value));
    await transactionToPromise(transaction);
  }

  async clearAllData(): Promise<void> {
    const database = await this.getDatabase();
    const transaction = database.transaction(this.getStoreNames(), 'readwrite');

    this.getStoreNames().forEach((storeName) => {
      transaction.objectStore(storeName).clear();
    });

    await transactionToPromise(transaction);
  }

  async deleteDatabase(): Promise<void> {
    const database = await this.getDatabase();
    database.close();
    this.databasePromise = null;

    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this.databaseName);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error ?? new Error('IndexedDB delete failed'));
      request.onblocked = () => reject(new Error('IndexedDB delete blocked'));
    });
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.databaseName, TRACKER_DATABASE_VERSION);

      request.onupgradeneeded = () => {
        const database = request.result;

        if (!database.objectStoreNames.contains(CHECK_INS_STORE)) {
          const store = database.createObjectStore(CHECK_INS_STORE, { keyPath: 'id' });
          store.createIndex('createdAt', 'createdAt', { unique: false });
          store.createIndex('dateKey', 'dateKey', { unique: false });
        }

        if (!database.objectStoreNames.contains(WARNING_SIGNS_STORE)) {
          const store = database.createObjectStore(WARNING_SIGNS_STORE, { keyPath: 'id' });
          store.createIndex('sortOrder', 'sortOrder', { unique: false });
        }

        if (!database.objectStoreNames.contains(WEEKLY_REFLECTIONS_STORE)) {
          const store = database.createObjectStore(WEEKLY_REFLECTIONS_STORE, { keyPath: 'id' });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }

        if (!database.objectStoreNames.contains(SINGLETON_RECORDS_STORE)) {
          database.createObjectStore(SINGLETON_RECORDS_STORE, { keyPath: 'key' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error('IndexedDB open failed'));
    });
  }

  private getStoreNames(): string[] {
    return [
      CHECK_INS_STORE,
      WARNING_SIGNS_STORE,
      WEEKLY_REFLECTIONS_STORE,
      SINGLETON_RECORDS_STORE,
    ];
  }
}

export const trackerStoreNames = {
  checkIns: CHECK_INS_STORE,
  warningSigns: WARNING_SIGNS_STORE,
  weeklyReflections: WEEKLY_REFLECTIONS_STORE,
  singletonRecords: SINGLETON_RECORDS_STORE,
} as const;
