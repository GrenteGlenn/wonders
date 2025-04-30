import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { GoogleMapComponent } from "../google-map/google-map.component";

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

}
