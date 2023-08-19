import { Injectable } from '@angular/core';
import { Room, RoomState } from '../types/room.types';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private _data: Room[] = [
    { number: 1, state: RoomState.CLEANED, pricePerDay: 300 },
    { number: 2, state: RoomState.RESERVED, pricePerDay: 400 },
    { number: 3, state: RoomState.DIRTY, pricePerDay: 150 },
    { number: 4, state: RoomState.TOCHECK, pricePerDay: 200 },
  ];

  getRooms(): Room[] {
    return this._data;
  }

  updateRoomStatus(roomNumber: number, newState: RoomState) {
    const roomToUpdate = this._data.find(room => room.number === roomNumber);
    if (roomToUpdate) {
      roomToUpdate.state = newState;
    }
  }

  getRoom(id: number){
    return this._data.find((room) => room.number === id) as Room
  }
}
