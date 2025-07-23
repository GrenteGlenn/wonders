import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css'
})
export class GoogleMapComponent implements OnChanges {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  @Input() lat: number | null | undefined = null;
  @Input() lng: number | null | undefined = null;
  @Input() markers: { lat: number; lng: number; label: string }[] = [];

  displayedMarkers: any[] = [];

  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: 0, lng: 0 },
    zoom: 2
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lat'] || changes['lng'] || changes['markers']) {
      this.updateMapCenter();
    }
  }

  updateMapCenter() {
    if (this.lat != null && this.lng != null) {
      this.options = {
        ...this.options,
        center: { lat: this.lat, lng: this.lng },
        zoom: 4
      };
    }

    // Charge tous les marqueurs reçus
    this.displayedMarkers = (this.markers || []).map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
      content: this.createCustomMarker(marker.label)
    }));
  }
  createCustomMarker(label: string = ''): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#0A612B" />
      <text x="12" y="16" font-size="10" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif">
        ${label?.charAt(0) ?? '?'}
      </text>
    </svg>
  `;
    return wrapper;
  }

  //   createCustomMarker(label: string = '') {
  //     const parser = new DOMParser();
  //     const svgString = `
  // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  //   <circle cx="12" cy="12" r="10" fill="#0A612B" />
  //   <text x="12" y="16" font-size="10" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif">
  //     ${label?.charAt(0) ?? '?'}
  //   </text>
  // </svg>
  // `;

  //     return parser.parseFromString(svgString, 'image/svg+xml').documentElement;
  //   }

  onMarkerClick(marker: any) {
    this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, marker.advancedMarker.title);
  }
}
