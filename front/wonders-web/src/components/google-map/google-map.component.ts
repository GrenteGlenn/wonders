import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css'
})
export class GoogleMapComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

	brLocations: any[] = [
		{ lat: 48.8651, lng: 2.35652 }, // France

	];
	// caLocations: any[] = [
	// 	{ lat: 48.4096, lng: -123.3693 },   // Willows Beach, Victoria (British Columbia)
	
	// ];

	options: google.maps.MapOptions = {
		mapId: 'DEMO_MAP_ID',
		center: { lat: 21.5505, lng: -46.6333 },
		zoom: 2,
	};

	constructor() {

	}

	ngOnInit() {
		const parser = new DOMParser();
		const svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0A612B" stroke="#FFFFFF" viewBox="0 0 24 24">
						  <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
						  </svg>`;
		this.brLocations.forEach((location) => {
			location.content = parser.parseFromString(svgString, "image/svg+xml").documentElement;
		});
		const beachFlag = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
		// this.caLocations.forEach((location) => {
		// 	let imgTag = document.createElement("img");
		// 	imgTag.src = beachFlag;
		// 	location.content = imgTag;
		// });
	}

	onMarkerClick(marker: any) {
		this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, marker.advancedMarker.title);
	}

}
