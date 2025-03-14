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
		{ lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
		{ lat: -23.5505, lng: -46.6333 }, // São Paulo
		{ lat: -15.7939, lng: -47.8828 }, // Brasília
		{ lat: -12.9777, lng: -38.5016 }, // Salvador
		{ lat: -3.1190, lng: -60.0217 },  // Manaus
	];
	caLocations: any[] = [
		{ lat: 48.4096, lng: -123.3693 },   // Willows Beach, Victoria (British Columbia)
		{ lat: 44.6348, lng: -63.5783 },    // Lawrencetown Beach, Halifax (Nova Scotia)
		{ lat: 49.6841, lng: -124.9998 },   // Rathtrevor Beach, Parksville (British Columbia)
		{ lat: 45.3446, lng: -63.2687 },    // Melmerby Beach, New Glasgow (Nova Scotia)
		{ lat: 49.0053, lng: -122.8634 },   // White Rock Beach, White Rock (British Columbia)
	];

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
		this.caLocations.forEach((location) => {
			let imgTag = document.createElement("img");
			imgTag.src = beachFlag;
			location.content = imgTag;
		});
	}

	onMarkerClick(marker: any) {
		this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, marker.advancedMarker.title);
	}

}
