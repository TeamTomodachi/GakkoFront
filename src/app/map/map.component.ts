import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Events } from '@ionic/angular';
import { leaflet, icon, Marker } from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.js';
import { RaidService } from '../services/raid.service'
import { Raid } from '../models/raid'

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

    constructor (public rs: RaidService) {

    }

    public ngOnInit() {
        this.map = L.map( 'map', {
            center: [45.2748993, -75.743832],
            zoom: 16
        });
        this.raids = this.rs.getRaids();
        this.middle(this.map.getCenter());
        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a','b','c']
        }).addTo( this.map );

        for ( var i=0; i < this.raids.length; ++i ) 
        {
            L.marker( [this.raids[i].lat, this.raids[i].lng] )
                .bindPopup( '<p>' + this.raids[i].name + '</p>' )
                .addTo( this.map );
        }

        this.map.on('dragend', () => {
           this.middle(this.map.getCenter());
        });
        
     }
    public ngAfterViewInit() {
        this.map.invalidateSize(true);
    }
    ngAfterViewChecked() {
        this.map.invalidateSize();
    }

    public addMarker(lat, lng, map) {
        //L.marker([center.lat, center.lng]).addTo( this.map );
        //console.log(lat, lng, map);
        L.marker([lat, lng]).addTo( map );
    }

    //really dont want to use the below
    public addNewMarker(raid) {
        //console.log(lat, lng, this.map);
        L.marker([raid.lat, raid.lng]).bindPopup( '<p>' + raid.name + '</p>' ).addTo( this.map );
    }

    public setAllMarkers(event) {
        console.log(event);
    }

    public reloadMap() {
        //this.map.redraw();
        // map.invalidateSize();
        //     setTimeout(() => {
        //       this.map.invalidateSize();
        //     }, 0);
         //}
         this.map.invalidateSize();
    }
}