import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapComponent } from '../../map/map.component';
import { RaidService } from '../../services/raid.service';
import { Raid } from '../../models/raid';

@Component({
  selector: 'app-raid-room',
  templateUrl: './raid-room.component.html',
  styleUrls: ['./raid-room.component.scss'],
})
export class RaidRoomComponent implements OnInit {

  map;
  raid;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  leaveRoom(){
    this.modalController.dismiss();
  }

}
