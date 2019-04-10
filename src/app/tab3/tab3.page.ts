import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { RaidService } from '../services/raid.service'
import { Raid } from '../models/raid'
import { ModalController, ToastController, AlertController  } from '@ionic/angular'
import { AddRaidComponent } from './add-raid/add-raid.component';
import { RaidRoomComponent } from './raid-room/raid-room.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild(MapComponent)
  public mapElement: MapComponent;
  @Input()
  public marker: (center: string) => void;
  @Input()
  public raidList: (raids: Array<any>) => void;
  @Input()
  public raids: Raid[]
  @Input()
  public middle: any = "";
  @Input()
  public map: any;
  @Output()
  allRaids: EventEmitter<any> = new EventEmitter();

constructor(public rs: RaidService, public modalController: ModalController, public toastController: ToastController, public alertController: AlertController) {
  this.setLatLng = this.setLatLng.bind(this);
  //this.raids = this.rs.getRaids();
  }

  public ngOnInit() {
    this.map = this.mapElement.map;
    this.raids = this.rs.getRaids();
  }

  ngOnViewInit() {
    //this.raids = this.mapElement.raids;
    for ( var i=0; i < this.raids.length; ++i ) 
      {
        this.addMarker(this.raids[i].lat, this.raids[i].lng, this.mapElement.map);
      }
    this.setRaids();
  }
  
  async displayForm() {
    const modal = await this.modalController.create({
      component: AddRaidComponent,
      cssClass: "addRaid"
        });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.addNewMarker(data);
      this.notifyRoomCreated(data)
    }
  }

  async joinRoom() {
    const alert = await this.alertController.create({
      header: 'Enter room numer:',
      inputs: [
        {
          name: 'roomNum',
          type: 'text',
          placeholder: 'Room numer...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log(data);
            this.enterRoom(data.roomNum);
          }
        }
      ]
    });

    await alert.present();
  }

  async enterRoom(roomNum) {
    const modal = await this.modalController.create({
      component: RaidRoomComponent,
      componentProps: { 
        roomNum: roomNum,
        map: this.mapElement
      },
      cssClass: 'raidRoom'
        });
    await modal.present();

  }

  async notifyRoomCreated(raid) {
    const toast = await this.toastController.create({
      message: "A new raid room has been added.\nYour room number is: " + raid.roomNum,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Close',
      duration: 2000
    });
    toast.present();
  }

  setLatLng(center) {
    this.middle=center;
  }

  getRaids(raids) {
    this.raidList = raids;
  }

  setRaids() {
    this.allRaids.emit(this.raidList);
  }

  addMarker(lat, lng, map) {
    this.mapElement.addMarker(lat, lng, map);
  }
  //really dont want to have to keep this
  addNewMarker(raid) {
    let newRaid: Raid = this.rs.addRaid(this.middle, raid);
    this.mapElement.addNewMarker(newRaid);
  }
}
