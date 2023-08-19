import { Form, FormArray, FormControl } from "@angular/forms";
import { Room } from "../../Rooms/types/room.types";

export enum Services {
  FACEBOOK = 'Facebook',
  GOOGLE = 'Google',
  BING = 'Bing'
}

export interface Advertisement {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    selectedServices: string[];
    selectedRooms: string[];
  }

export type AdvertisementForm = {
  title: FormControl<string>,
  description: FormControl<string>,
  startDate: FormControl<Date>,
  endDate: FormControl<Date>,
  duration: FormControl<number>,
  selectedServices: FormArray<FormControl<Services>>,
  selectedRooms: FormArray<FormControl<Room>>,
}  