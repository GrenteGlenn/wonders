import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SearchDestinationComponent } from "../search-destination/search-destination.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LucideAngularModule, SearchDestinationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {}
