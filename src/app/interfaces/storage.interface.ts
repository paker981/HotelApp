export interface AbstractStorageService {
    clear(): void;
    getData(role: Role): string,
    saveData(role: Role, token: string): void
}

export enum Role {
    WORKER = 'worker',
    ADMIN = 'admin'
}