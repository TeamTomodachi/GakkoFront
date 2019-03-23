import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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

        var map = L.map( 'map', {
            center: [45.2748993, -75.743832],
            zoom: 16
        });

        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a','b','c']
        }).addTo( map );
    }
}