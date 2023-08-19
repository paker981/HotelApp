import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
}) 
export class AdminPreloadStrategy implements PreloadingStrategy{

    constructor(private authService: AuthService){}

    preload(route: Route, fn: ()=>Observable<any>): Observable<any> {
        console.log(this.authService.isAdmin())
        return this.authService.isAdmin() ? fn() : of(null) 
    }

}