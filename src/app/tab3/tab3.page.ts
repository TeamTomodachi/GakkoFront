import { Component, Input, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(MapComponent)
  public mapElement: MapComponent;
  @Input()
  public marker: (center: string) => void;
  @Input() 
  public map: MapComponent;

  middle = 'Map center';
  constructor() {
    this.setLatLng = this.setLatLng.bind(this);
  }

  setLatLng(center) {
    this.middle=center;
  }

  addMarker() {
    this.mapElement.addMarker(this.middle, this.mapElement.map);
  }
}
