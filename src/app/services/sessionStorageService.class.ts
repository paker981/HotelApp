import { AbstractStorageService, Role } from "../interfaces/storage.interface";

export class SessionStorageService implements AbstractStorageService {
    
    getData(role: Role): string {
        const token = sessionStorage.getItem(role);
        return token ? token : '';
    }
    saveData(role: Role, token: string): void {
        sessionStorage.setItem(role, token);
    }

}