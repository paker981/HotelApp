import { Injectable } from '@angular/core';
import { Room, RoomState } from '../types/room.types';
import { BehaviorSubject, Observable } from 'rxjs';

export const data: Room[] = [
  { number: 1, state: RoomState.CLEANED, pricePerDay: 300 },
  { number: 2, state: RoomState.RESERVED, pricePerDay: 400 },
  { number: 3, state: RoomState.DIRTY, pricePerDay: 150 },
  { number: 4, state: RoomState.TO_CHECK, pricePerDay: 200 },
];


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private _data: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(data);
  data$: Observable<Room[]> = this._data.asObservable();

  set data(data: Room[]) {
    this._data.next(data);
  }

  updateRoomStatus(roomNumber: number, newState: RoomState) {
    const data = this._data.getValue();
    const roomToUpdate = data.find(room => room.number === roomNumber);

    if (roomToUpdate) {
      roomToUpdate.state = newState;
    }
    this._data.next(data);
    return {...roomToUpdate};
  }

  getRoom(id: number){
    const data = this._data.getValue()
    return data.find((room) => room.number === id) as Room
  }
}
