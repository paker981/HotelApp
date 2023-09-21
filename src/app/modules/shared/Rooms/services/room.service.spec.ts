import { Room, RoomState } from "../types/room.types";
import { RoomService } from "./room.service";


describe('RoomService', () => {
    let roomService: RoomService;

    beforeEach(() => {
      roomService = new RoomService();

      roomService.data = [
        { number: 1, state: RoomState.CLEANED, pricePerDay: 300 },
        { number: 2, state: RoomState.RESERVED, pricePerDay: 400 },
        { number: 3, state: RoomState.DIRTY, pricePerDay: 150 },
        { number: 4, state: RoomState.TO_CHECK, pricePerDay: 200 }
      ]
    });
  
    it('should update room status', () => {
      // given
      const roomNumber = 1;
      const newState = RoomState.TO_CHECK;
  
      // when
      const updatedRoom = roomService.updateRoomStatus(roomNumber, newState);
      const room = roomService.getRoom(roomNumber);
  
      // then
      expect(updatedRoom.state).toBe(newState);
      expect(room.state).toBe(newState);
    });
  
    it('should return a room by id', () => {
      // given
      const roomNumber = 2;
  
      // when
      const room = roomService.getRoom(roomNumber);
  
      // then
      expect(room.number).toBe(roomNumber);
    });
  });
  
  
  