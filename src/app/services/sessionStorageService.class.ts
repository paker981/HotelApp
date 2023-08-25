import { AbstractStorageService, Role } from "../interfaces/storage.interface";

export class SessionStorageService implements AbstractStorageService {

    clear(): void {
        sessionStorage.clear();
    }
    
    getData(role: Role): string { // token: string
        const token = sessionStorage.getItem(role);
        return token ? token : '';
    }
    saveData(role: Role, token: string): void {// data:any, token: string
        sessionStorage.setItem(role, token);
    }

}