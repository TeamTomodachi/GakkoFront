import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { RaidService } from '../services/raid.service'
import { Raid } from '../models/raid'

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

constructor(public rs: RaidService) {
  this.setLatLng = this.setLatLng.bind(this);
  //this.raids = this.rs.getRaids();
  }

  public ngOnInit() {
    this.map = this.mapElement.map;
    // this.setRaids();
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
  addNewMarker() {
    let newRaid: Raid = this.rs.addRaid(this.middle);
    //this.mapElement.reloadMap();
    this.mapElement.addNewMarker(newRaid);
  }
}
