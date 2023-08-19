import { InjectionToken } from "@angular/core";
import { AbstractStorageService } from "../interfaces/storage.interface";

export const STORAGE_TOKEN = new InjectionToken<AbstractStorageService>('storage');