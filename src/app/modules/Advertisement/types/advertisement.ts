import { Form, FormArray, FormControl, FormGroup } from "@angular/forms";
import { Room } from "../../shared/Rooms/types/room.types";

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

export type BasicStepForm ={
  title: FormControl<string>,
  description: FormControl<string>,
  startDate: FormControl<Date>,
  endDate: FormControl<Date>,
  duration: FormControl<number>,
}

export type BasicStepData = {
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  duration: number
}



export type AdvertisementForm = {
  basicStep: FormGroup<BasicStepForm>,
  selectedServices: FormArray<FormControl<Services>>,
  selectedRooms: FormArray<FormControl<Room>>,
}  