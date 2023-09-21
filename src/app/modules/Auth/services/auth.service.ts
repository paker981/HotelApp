import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { generateToken } from '@app/helpers/token.generator';
import { AbstractStorageService, Role } from '@app/interfaces/storage.interface';
import { TOKEN_GENERATOR } from '@app/tokens/generator.token';
import { STORAGE_SERVICE } from '@app/tokens/storage.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(STORAGE_SERVICE) private storageService: AbstractStorageService,
    @Inject(TOKEN_GENERATOR) private tokenGenerator: ()=>string,
              ) { }

  log(login: Role) {
    const newToken = this.tokenGenerator();
    this.storageService.saveData(login, newToken)
  }

  logOut(){
    this.storageService.clear()
  }

  isLoggedIn(role: Role): boolean{
    const token = this.storageService.getData(role);
    return token.length === 32 ? true : false;
  }
}
