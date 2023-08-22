import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RoomState } from '../../types/room.types';
import { FormControl, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.scss']
})
export class ViewRoomComponent{
  protected roomStates = RoomState;
  protected data = this.route.snapshot.data['room'];
  protected form: FormControl<RoomState> = new FormControl('' as unknown as RoomState,Validators.required) as FormControl<RoomState>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private roomService: RoomService,
    private snackBar: MatSnackBar
  ){}

  protected onEdit(roomNumber: number){
    if(this.form.invalid){
      CustomSnackBarComponent.openErrorSnackBar(this.snackBar, 'Form invalid', 'Close');
      return;
    }
    CustomSnackBarComponent.openSuccessSnackBar(this.snackBar, 'Successful updated!', 'Close');
    this.roomService.updateRoomStatus(roomNumber,this.form.value);
    this.location.back();
  }

}
