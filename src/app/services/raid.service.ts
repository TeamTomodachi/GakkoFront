import { Injectable } from '@angular/core';
import { Raid } from '../models/raid';
import { HttpHeaders } from '@angular/common/http';

// not yet implemented. Once a proper back end for raids is implemented this could be used.
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RaidService {

  // placeholder raid list with 3 raids.
  raidList: Array<Raid> = this.raidList  = [
    {
      'roomNum': Math.floor(Math.random() * 10000) + 1000,
      'address': '',
      'lat': 45.2775417,
      'lng': -75.7393688,
      'time': '18-04-22 04:19'
    },
    {
      'roomNum': Math.floor(Math.random() * 10000) + 1000,
      'address': '',
      'lat': 45.2717433,
      'lng': -75.738532,
      'time': '18-04-28 07:01'
    },
    {
      'roomNum': Math.floor(Math.random() * 10000) + 1000,
      'address': '',
      'lat': 45.2668505,
      'lng': -75.7500547,
      'time': '18-04-28 04:21'
    }
 ];

  constructor() { }

  getRaids() {

   this.updateRaids();

   return this.raidList;

  }

  // return a raide (from a provided list of raids) by room number. Will need to be adjusted once a backend for raid lists is implemented.
  getRaidByRoomNum(roomNum, raids): any {
    let selectedRaid = null;
    raids.forEach(raid => {
      if (raid.roomNum === +roomNum) {
        selectedRaid = raid;
      }
    });
    return selectedRaid;
  }

  // create and add a new raid
  addRaid(center, raid) {
    const newRaid: Raid = new Raid;
    newRaid.lat = center.lat;
    newRaid.lng = center.lng;
    newRaid.address = '';
    newRaid.roomNum = Math.floor(Math.random() * 10000) + 1000;
    if (raid.roomNum) {
      newRaid.roomNum = raid.roomNum;
    }
    if (raid.time) {
      newRaid.time = raid.time.replace('T', ' ');
      newRaid.time = newRaid.time.slice(2, 16);
    }
    this.raidList.push(newRaid);
    this.updateRaids();
    return newRaid;
  }

  // below just updates raids with proper format and generates a raid room with a random number.
  // Once placeholder data is replaced with real data, this should not be required.
  updateRaids() {
    this.raidList.forEach(async raid => {
      if (raid.address === '') {
       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${raid.lat}&lon=${raid.lng}`);
       const responseJson = (await response.json());
       if (!responseJson.address.house_number) {
        responseJson.address.house_number = '';
       }
       raid.address = responseJson.address.house_number + ' ' + responseJson.address.road;
      }
      if (!raid.roomNum) {
        raid.roomNum = Math.floor(Math.random() * 10000) + 1000;
      }
      if (raid.time) {
        raid.time = raid.time.replace('T', ' ');
        raid.time = raid.time.slice(2, 16);
      }
    });
  }
}
