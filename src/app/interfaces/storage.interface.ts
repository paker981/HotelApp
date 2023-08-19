export interface AbstractStorageService {
    getData(role: Role): string,
    saveData(role: Role, token: string): void
}

export enum Role {
    WORKER = 'worker',
    ADMIN = 'admin'
}