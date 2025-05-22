import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { GoogleMapComponent } from '../google-map/google-map.component';

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


  get centerLat(): number | null {
    return this.activity?.latitude ?? this.destination?.latitude ?? null;
  }
  
  get centerLng(): number | null {
    return this.activity?.longitude ?? this.destination?.longitude ?? null;
  }
  
  // Liste des marqueurs à afficher
  get markers(): { lat: number; lng: number; label: string }[] {
    const result: { lat: number; lng: number; label: string }[] = [];
  
    if (this.destination?.latitude && this.destination?.longitude) {
      result.push({
        lat: this.destination.latitude,
        lng: this.destination.longitude,
        label: this.destination.name ?? 'Pays'
      });
    }
  
    if (this.activity?.latitude && this.activity?.longitude) {
      result.push({
        lat: this.activity.latitude,
        lng: this.activity.longitude,
        label: this.activity.name ?? 'Ville'
      });
    }
  
    return result;
  }
  showMore = false;
}
