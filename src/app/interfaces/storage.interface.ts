export interface AbstractStorageService {
    clear(): void;
    getData(role: Role): string,
    saveData(role: Role, token: string): void
}

export interface AbstractSessionStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
  }

export enum Role {
    WORKER = 'worker',
    ADMIN = 'admin'
}