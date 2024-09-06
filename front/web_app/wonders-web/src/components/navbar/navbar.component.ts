import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}
  goPlanTrip() {
    this.router.navigate(['planTrip']); 
  };
  goHomePage(){
    this.router.navigate(['home']); 
  };
  goQuestion(){
    this.router.navigate(['question']);  
  };
}
