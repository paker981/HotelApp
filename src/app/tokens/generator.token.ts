import { InjectionToken } from "@angular/core";


export const TOKEN_GENERATOR = new InjectionToken<(()=>string)>('token');