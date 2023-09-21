import { TestBed } from "@angular/core/testing";
import { RoomService } from "../services/room.service";
import { roomDataResolver } from "./room-data.resolver";
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

describe('roomDataResolver', () => {

  
    const roomServiceMock = {
      getRoom: jest.fn()
    };
  
  
    beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [],
        providers: [
          {
            provide: RoomService,
            useValue: roomServiceMock
          }
        ],
      }).compileComponents();
  
    });
  
    it('should return a room', (() => {
      // given
      roomServiceMock.getRoom.mockReturnValue({ id: 1, name: 'Test Room' });
  
      // when
      const resolver = TestBed.runInInjectionContext(() => {
          return roomDataResolver({ params: { id: "1" } } as unknown as ActivatedRouteSnapshot, null as unknown as RouterStateSnapshot);
        });
  
      // then
      expect(roomServiceMock.getRoom).toHaveBeenCalledWith(1);
      expect(resolver).toEqual({ id: 1, name: 'Test Room' });
    }));
  });
  
  
  