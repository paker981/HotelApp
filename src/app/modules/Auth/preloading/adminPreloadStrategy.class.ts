import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { Role } from "@app/interfaces/storage.interface";

@Injectable({
    providedIn: 'root'
}) 
export class AdminPreloadStrategy implements PreloadingStrategy{

    constructor(private authService: AuthService){}

    preload(route: Route, fn: ()=>Observable<any>): Observable<any> {
        return this.authService.isLoggedIn(Role.ADMIN) ? fn() : of(null) 
    }

}