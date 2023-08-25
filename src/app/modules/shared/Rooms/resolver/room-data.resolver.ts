import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../types/room.types';

export const roomDataResolver: ResolveFn<Room> = (route, state) => {
  const id = route.params['id'];
  const roomService = inject(RoomService);

  return roomService.getRoom(parseInt(id));
};
