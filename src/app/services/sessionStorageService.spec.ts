
import { AbstractSessionStorage, AbstractStorageService, Role } from '@app/interfaces/storage.interface';
import { SessionStorageService } from './sessionStorageService.class';
// Importuj klasę SessionStorageService

describe('SessionStorageService', () => {
  let sessionStorageService: AbstractStorageService;
  const windowMock = {
    sessionStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn()
    }
  }

  beforeEach(() => {
    sessionStorageService = new SessionStorageService(windowMock as unknown as Window); // <--- mockujesz window <iframe>
  });

  it('should clear session storage', () => {
    // when
    sessionStorageService.clear();

    // then
    expect(windowMock.sessionStorage.clear).toHaveBeenCalled();
  });

  it('should save data to session storage', () => {
    // given
    const role = Role.ADMIN;
    const token = 'someToken';

    // when
    sessionStorageService.saveData(role, token);

    // then
    expect(windowMock.sessionStorage.setItem).toHaveBeenCalledWith(role, token);
  });

  it('should get data from session storage', () => {
    // given
    const role = Role.ADMIN;
    const token = 'someToken';
    windowMock.sessionStorage.getItem.mockReturnValue(token);

    // when
    const result = sessionStorageService.getData(role);

    // then
    expect(windowMock.sessionStorage.getItem).toHaveBeenCalledWith(role);
    expect(result).toBe(token);
  });

  it('should return empty string if data is not found in session storage', () => {
    // given 
    const role = Role.WORKER;
    windowMock.sessionStorage.getItem.mockReturnValue(null);

    // when
    const result = sessionStorageService.getData(role);

    // then
    expect(windowMock.sessionStorage.getItem).toHaveBeenCalledWith(role);
    expect(result).toBe('');
  });
});