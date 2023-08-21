import { Injectable } from '@angular/core';
import { Room, RoomState } from '../types/room.types';
import { BehaviorSubject, Observable } from 'rxjs';

export const data: Room[] = [
  { number: 1, state: RoomState.CLEANED, pricePerDay: 300 },
  { number: 2, state: RoomState.RESERVED, pricePerDay: 400 },
  { number: 3, state: RoomState.DIRTY, pricePerDay: 150 },
  { number: 4, state: RoomState.TOCHECK, pricePerDay: 200 },
];


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private _dataSubject: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(data);
  data$: Observable<Room[]> = this._dataSubject.asObservable();

  updateRoomStatus(roomNumber: number, newState: RoomState) {
    const data = this._dataSubject.getValue();
    const roomToUpdate = data.find(room => room.number === roomNumber);
    console.log(roomToUpdate);
    console.log(data)
    if (roomToUpdate) {
      roomToUpdate.state = newState;
    }
    console.log(data)
    this._dataSubject.next(data);
  }

  getRoom(id: number){
    const data = this._dataSubject.getValue()
    return data.find((room) => room.number === id) as Room
  }
}
