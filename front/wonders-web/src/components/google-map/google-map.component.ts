import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsLoaderService } from '../../app/service/googlemap/googlemap.service';

type MarkerInput = { lat: number; lng: number };

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit, OnChanges {
  @Input() lat: number | null | undefined = null;
  @Input() lng: number | null | undefined = null;
  @Input() markers: MarkerInput[] = [];
  /** Active le recentrage automatique sur les marqueurs. OFF par défaut. */
  @Input() autoFit = false;

  @ViewChild(GoogleMap) map?: GoogleMap;

  mapsReady = false;

  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: 0, lng: 0 },
    zoom: 2,
    gestureHandling: 'greedy',
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  };

  displayedMarkers: MarkerInput[] = [];

  constructor(private mapsLoader: GoogleMapsLoaderService) {}

  async ngOnInit() {
    await this.mapsLoader.load({ libraries: ['marker'], v: 'weekly' });

    if (typeof this.lat === 'number' && typeof this.lng === 'number') {
      this.options = { ...this.options, center: { lat: this.lat, lng: this.lng }, zoom: 5 };
    }

    this.displayedMarkers = this.markers?.length
      ? [...this.markers]
      : (typeof this.lat === 'number' && typeof this.lng === 'number'
          ? [{ lat: this.lat, lng: this.lng }]
          : []);

    this.mapsReady = true;

    if (this.autoFit) {
      queueMicrotask(() => this.fitToMarkers());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.mapsReady) return;

    if ('markers' in changes) {
      this.displayedMarkers = this.markers?.length ? [...this.markers] : this.displayedMarkers;
      if (this.autoFit) this.fitToMarkers();
    }

    if (('lat' in changes || 'lng' in changes) && typeof this.lat === 'number' && typeof this.lng === 'number') {
      this.options = { ...this.options, center: { lat: this.lat, lng: this.lng } };
      if (this.autoFit) this.fitToMarkers();
    }
  }

  private fitToMarkers() {
    if (!this.map || this.displayedMarkers.length === 0) return;

    if (this.displayedMarkers.length === 1) {
      const m = this.displayedMarkers[0];
      this.map.panTo({ lat: m.lat, lng: m.lng });
      this.map.zoom = 10;
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    this.displayedMarkers.forEach((m) => bounds.extend(new google.maps.LatLng(m.lat, m.lng)));

    try {
      this.map.fitBounds(bounds, { top: 48, right: 48, bottom: 48, left: 48 } as any);
    } catch {
      (this.map as any)._googleMap?.fitBounds(bounds, 48);
    }
  }
}
