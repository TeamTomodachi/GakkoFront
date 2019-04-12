import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import '../../../node_modules/leaflet/dist/leaflet.js';
import { RaidService } from '../services/raid.service';
import { Raid } from '../models/raid';

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
    @Input()
    public markers: any;
    @Input()
    public middle: (center: string) => void;
    @Input()
    public raids: any;
    @Input()
    public map: any;
    @Input()
    public controls: any;
    @Output()
    public joinRoomFromMap = new EventEmitter<Raid>();

    constructor (public rs: RaidService) {

    }

    // we are using leaflet.js for map generation, configuration, and modification
    public ngOnInit() {
        // generate a new leaflet map, set starting center point and zoom level
        this.map = L.map( 'map', {
            center: [45.2748993, -75.743832],
            zoom: 16
        });
        // get existing raids list
        this.raids = this.rs.getRaids();
        // set parameter for center of map (for raid/new marker generation)
        this.middle(this.map.getCenter());
        // add attribution layer as required by leaflet.js and openmaps (and most other map sources)
        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a','b','c']
        }).addTo( this.map );

        // set up markers for existing raids
        for ( var i=0; i < this.raids.length; ++i ) 
        {
            // set new marker
            var marker = L.marker( [this.raids[i].lat, this.raids[i].lng] );
            // set up popup for when marker is clicked
            var popup = L.popup()
                .setContent(  '<p>Room number:' + this.raids[i].roomNum + '</p>' +
                '<p (click)=joinRoomFromMap()>Join this raid room?</p>' );

            // set click event to popup for joining raid room
            popup.on('click', () => {
                console.log('clicked');

                //idea here is to be able to join a room by clicking the popup. The clickevent will not fire however.

                // let selectedRaid: Raid = this.rs.getRaidByRoomNum(this.raids[i].roomNum, this.raids);
                // console.log(selectedRaid);
                //this.joinRoomFromMap.emit(this.raids[i])
            });
            // bind popup to marker
            marker.bindPopup(popup);
            // add marker to map
            marker.addTo( this.map );
        }

        // reset center position when map is dragged/moved
        this.map.on('dragend', () => {
           this.middle(this.map.getCenter());
        });
    }
    
    // this is done to rerender the map after the view loads. This is here to fix a rendering issue with leaflet.
    public ngAfterViewChecked() {
        this.map.invalidateSize();
    }

    // add a marker to map
    public addMarker(lat, lng, map) {
        L.marker([lat, lng]).addTo( map );
    }

    // add a new marker to the map
    public addNewMarker(raid) {
        L.marker([raid.lat, raid.lng]).bindPopup( '<p>Room number:' + raid.roomNum + '</p>' +
        '<p (click)=joinRoomFromMap()>Join this raid room?</p>' ).addTo( this.map );
    }

    // keeping this in case there are other rendering issues with leaflet
    public reloadMap() {
         this.map.invalidateSize();
    }
}