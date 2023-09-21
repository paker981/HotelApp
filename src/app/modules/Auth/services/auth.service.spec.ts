import { AbstractStorageService, AbstractSessionStorage, Role } from "@app/interfaces/storage.interface";
import { SessionStorageService } from "@app/services/sessionStorageService.class";
import { AuthService } from "./auth.service";

describe('SessionStorageService', () => {
    let authService: AuthService;
  
    const storageServiceMock = {
      getData: jest.fn(),
      saveData: jest.fn(),
      clear: jest.fn()
    }

    const tokenGeneratorMock = jest.fn()
  
    beforeEach(() => {
        authService = new AuthService(storageServiceMock,tokenGeneratorMock); // <--- mockujesz window <iframe>
    });
  
    it('should log a user', () => {
      // given
      const user = Role.WORKER;
      const newToken = '123'
      tokenGeneratorMock.mockReturnValue(newToken)
  
      // when
      authService.log(user);
  
      // then
      expect(tokenGeneratorMock).toHaveBeenCalled();
      expect(storageServiceMock.saveData).toHaveBeenCalledWith(user,newToken);
    });
  
    it('should loggin correct a user', () => {
      // given
      const correctToken = 'qwertyuiopasdfghjklzxcvbnmqwerty';
      storageServiceMock.getData.mockReturnValue(correctToken);
      const user = Role.WORKER;
  
      // when
      const result = authService.isLoggedIn(user);
  
      // then
      expect(storageServiceMock.getData).toHaveBeenCalledWith(user);
      expect(result).toBeTruthy();
    });

    it('should loggin incorrect a user', () => {
        // given
        const incorrectToken = '123';
        storageServiceMock.getData.mockReturnValue(incorrectToken);
        const user = Role.WORKER;
    
        // when
        const result = authService.isLoggedIn(user);
    
        // then
        expect(storageServiceMock.getData).toHaveBeenCalledWith(user);
        expect(result).toBeFalsy();
      });
  
    it('should logout call method clear', () => {
      // when
      authService.logOut();
  
      // then
      expect(storageServiceMock.clear).toHaveBeenCalled();
    });
  });