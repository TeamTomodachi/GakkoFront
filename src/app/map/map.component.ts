import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { leaflet, icon, Marker } from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.js'
//import { markers } from './markers.json';
declare var L: any;
@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @ViewChild("map")
    public mapElement: ElementRef;
    @Input()
    public lat: any;
    @Input()
    public lng: any;
    public constructor() { }
    public ngOnInit() { }
    public ngAfterViewInit() {
        L.Icon.Default.imagePath = ''

        var markers = [
            {
              "name": "Raid 1",
              "address": "",
              "lat": 45.2775417,
              "lng": -75.7393688
            },
            {
              "name": "Raid 2",
              "address": "",
              "lat": 45.2717433,
              "lng": -75.738532
            },
            {
              "name": "Raid 3",
              "address": "",
              "lat": 45.2668505,
              "lng": -75.7500547
            }
         ];

        var map = L.map( 'map', {
            center: [45.2748993, -75.743832],
            zoom: 16
        });

        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a','b','c']
        }).addTo( map );

        for ( var i=0; i < markers.length; ++i ) 
        {
            L.marker( [markers[i].lat, markers[i].lng] )
                .bindPopup( '<p>' + markers[i].name + '</p>' )
                .addTo( map );
        }
    }
}