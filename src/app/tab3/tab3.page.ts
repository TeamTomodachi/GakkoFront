import { Component, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @Input()
  public marker: (center: string) => void;
  @Input() 
  public map: MapComponent;

  middle = 'Map center';
  constructor() {
    this.setstuff = this.setstuff.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }
  setstuff(a) {
    this.middle=a;
  }

  addMarker(lat, lng) {
    //console.log(lat, lng);
    this.map.addMarker(lat, lng);
  }
}
