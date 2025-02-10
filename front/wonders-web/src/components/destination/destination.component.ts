import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface R {
  image:string,
  title: string,
  subtitle: string
}

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css'
})
export class DestinationComponent {
  mainDest: R  = {
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Paris',
    subtitle: 'France'
  }

  activities: R[] = [
    {
      image: 'assets/images/destination1.png',
      title: 'Notre-Dame de Paris',
      subtitle: 'Religious site'
    },
    {
      image: 'assets/images/destination2.png',
      title: 'Louvre Museum',
      subtitle: 'Museum'
    },
    {
      image: 'assets/images/destination3.png',
      title: 'Champs-Élysées',
      subtitle: 'Boulevard'
    },
    {
      image: 'assets/images/destination4.png',
      title: 'Palace of Versailles',
      subtitle: 'Palace'
    },
    {
      image: 'assets/images/destination5.png',
      title: 'Seine River',
      subtitle: 'River'
    },
    {
      image: 'assets/images/destination6.png',
      title: 'Montmartre',
      subtitle: 'Neighborhood'
    },
    {
      image: 'assets/images/destination7.png',
      title: 'Musée d\'Orsay',
      subtitle: 'Art museum'
    },
    {
      image: 'assets/images/destination8.png',
      title: 'Luxembourg Gardens',
      subtitle: 'Historic park'
    },
  ]
}
