import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { GoogleMapComponent } from '../google-map/google-map.component';

type Marker = { lat: number; lng: number };

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, GoogleMapComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  @Input() destination: any;
  @Input() activity: any;
  @Input() flight: any;
  @Input() hotel: any;

  showMore = false;

  get centerLat(): number | null {
    // centre = ville si dispo, sinon pays
    return this.activity?.latitude ?? this.destination?.latitude ?? null;
  }
  get centerLng(): number | null {
    return this.activity?.longitude ?? this.destination?.longitude ?? null;
  }

  // → 2 marqueurs : pays + ville (si dispo)
  get markers(): Marker[] {
    const out: Marker[] = [];
    if (typeof this.destination?.latitude === 'number' && typeof this.destination?.longitude === 'number') {
      out.push({ lat: this.destination.latitude, lng: this.destination.longitude });
    }
    if (typeof this.activity?.latitude === 'number' && typeof this.activity?.longitude === 'number') {
      out.push({ lat: this.activity.latitude, lng: this.activity.longitude });
    }
    return out;
  }
}
