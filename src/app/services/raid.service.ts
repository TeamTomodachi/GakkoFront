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
      "roomNum": Math.floor(Math.random() * 10000) + 1,
      "address": "",
      "lat": 45.2775417,
      "lng": -75.7393688
    },
    {
      "roomNum": Math.floor(Math.random() * 10000) + 1,
      "address": "",
      "lat": 45.2717433,
      "lng": -75.738532
    },
    {
      "roomNum": Math.floor(Math.random() * 10000) + 1,
      "address": "",
      "lat": 45.2668505,
      "lng": -75.7500547
    }
 ];;

  constructor() { }

  protected setRaids() {

  }

  getRaids() {

   this.updateRaids();

   return this.raidList;

  }

  addRaid(center) {
    let newRaid: Raid = new Raid;
    newRaid.lat = center.lat;
    newRaid.lng = center.lng;
    newRaid.address = "";
    newRaid.roomNum = Math.floor(Math.random() * 10000) + 1;

    this.raidList.push(newRaid);
    this.updateRaids();
    return newRaid;
  }

  updateRaids() {
    this.raidList.forEach(async element => {
      if (element.address == "") {
       const response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat='+element.lat+'&lon='+element.lng);
       const responseJson = (await response.json());
       element.address = responseJson.address.house_number + " " + responseJson.address.road;
      }
    });
  }
  
}
