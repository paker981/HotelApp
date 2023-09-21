import { Injectable } from "@angular/core";
import { AbstractSessionStorage, AbstractStorageService, Role } from "../interfaces/storage.interface";

export class SessionStorageService implements AbstractStorageService {


    constructor(private readonly window: Window){}

    clear(): void {
        this.window.sessionStorage.clear();
    }
    
    getData(role: Role): string { // token: string
        const token = this.window.sessionStorage.getItem(role);
        return token ? token : '';
    }
    saveData(role: Role, token: string): void {// data:any, token: string
        this.window.sessionStorage.setItem(role, token);
    }

}