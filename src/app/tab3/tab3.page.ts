import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { RaidService } from '../services/raid.service';
import { Raid } from '../models/raid';
import { ModalController, ToastController, AlertController  } from '@ionic/angular';
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
  public raids: Raid[];
  @Input()
  public middle: any = '';
  @Input()
  public map: any;
  @Output()
  allRaids: EventEmitter<any> = new EventEmitter();

constructor(public rs: RaidService,
  public modalController: ModalController,
  public toastController: ToastController,
  public alertController: AlertController) {
  this.setLatLng = this.setLatLng.bind(this);
  }

  public ngOnInit() {
    this.map = this.mapElement.map;
    this.raids = this.rs.getRaids();
  }

  ngOnViewInit() {
    // add all the markers from raid service
    for ( let i = 0; i < this.raids.length; ++i ) {
      this.addMarker(this.raids[i].lat, this.raids[i].lng, this.mapElement.map);
    }
    this.setRaids();
  }

  // display a modal with a form to create a new raid
  async displayForm() {
    // set up modal
    const modal = await this.modalController.create({
      component: AddRaidComponent,
      cssClass: 'addRaid'
        });
    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      // on successful data return, create a new raid/marker and notify user via toast notification.
      this.addNewMarker(data);
      this.notifyRoomCreated(data);
    }
  }

  // display an alert with an input for room number to join a raid room
  async joinRoom() {
    // set up alert
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
            // if raid room exists, join room. Otherwise display a toast notification.
            if (this.rs.getRaidByRoomNum(data.roomNum, this.raids)) {
              const selectedRaid = this.rs.getRaidByRoomNum(data.roomNum, this.raids);
              this.enterRoom(selectedRaid);
            } else {
             console.log(this.raids.map(raid => raid.roomNum));
             this.notifyInvalidRaid();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // enter raid room
  async enterRoom(raid) {
    // set up raid room modal. Pass through selected raid
    const modal = await this.modalController.create({
      component: RaidRoomComponent,
      componentProps: {
        raid: raid,
        // map wont pass through
        map: this.mapElement
      },
      cssClass: 'raidRoom'
        });
    await modal.present();

  }

  // toast notification that raid has been created
  async notifyRoomCreated(raid) {
    const toast = await this.toastController.create({
      message: 'A new raid room has been added.\nYour room number is: ' + raid.roomNum,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Close',
      duration: 2000
    });
    toast.present();
  }

  // toast notification that entered raid room number does not exist
  async notifyInvalidRaid() {
    const toast = await this.toastController.create({
      message: 'Raid room does not exist. Please enter a different one.',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Close',
      duration: 2000
    });
    toast.present();
  }

  // reset latlng(center position) when map is done being dragged.
  setLatLng(center) {
    this.middle = center;
  }

  // set up raid list
  setRaids() {
    this.allRaids.emit(this.raidList);
  }

  // add all markers for already existing raids
  addMarker(lat, lng, map) {
    this.mapElement.addMarker(lat, lng, map);
  }

  // add a new raid/marker for any newly created raid. Hopefully this can be properly merged with above in the future.
  addNewMarker(raid) {
    const newRaid: Raid = this.rs.addRaid(this.middle, raid);
    this.raids.push(newRaid);
    this.mapElement.addNewMarker(newRaid);
  }
}
