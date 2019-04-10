import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Raid } from '../models/raid'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RaidService {

  raidList: Array<Raid> = this.raidList  = [
    {
      "roomNum": Math.floor(Math.random() * 10000) + 1000,
      "address": "",
      "lat": 45.2775417,
      "lng": -75.7393688,
      "time": "18-04-22 04:19"
    },
    {
      "roomNum": Math.floor(Math.random() * 10000) + 1000,
      "address": "",
      "lat": 45.2717433,
      "lng": -75.738532,
      "time": "18-04-28 07:01"
    },
    {
      "roomNum": Math.floor(Math.random() * 10000) + 1000,
      "address": "",
      "lat": 45.2668505,
      "lng": -75.7500547,
      "time": "18-04-28 04:21"
    }
 ];;

  constructor() { }

  getRaids() {

   this.updateRaids();

   return this.raidList;

  }

  addRaid(center, raid) {
    let newRaid: Raid = new Raid;
    newRaid.lat = center.lat;
    newRaid.lng = center.lng;
    newRaid.address = "";
    newRaid.roomNum = Math.floor(Math.random() * 10000) + 1000;
    if (raid.roomNum) {
      newRaid.roomNum = raid.roomNum;
    }
    if (raid.time) {
      newRaid.time = raid.time.replace("T", " ");
      newRaid.time = newRaid.time.slice(2, 16);
      //newRaid.time = raid.time;
    }
    this.raidList.push(newRaid);
    this.updateRaids();
    return newRaid;
  }

  updateRaids() {
    this.raidList.forEach(async element => {
      if (element.address == "") {
       const response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat='+element.lat+'&lon='+element.lng);
       const responseJson = (await response.json());
       if (!responseJson.address.house_number) {
        responseJson.address.house_number = "";
       }
       element.address = responseJson.address.house_number + " " + responseJson.address.road;
      }
    });
  }
  
}
