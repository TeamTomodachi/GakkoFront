import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-raid-room',
  templateUrl: './raid-room.component.html',
  styleUrls: ['./raid-room.component.scss'],
})
export class RaidRoomComponent implements OnInit {

  map;
  roomNum;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.map);
  }

  leaveRoom(){
    this.modalController.dismiss();
  }

}
