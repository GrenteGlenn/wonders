import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-plan-trip',
  standalone: true,
  imports: [
    LucideAngularModule
  ],
  templateUrl: './plan-trip.component.html',
  styleUrl: './plan-trip.component.css'
})
export class PlanTipComponent implements OnInit {
  cityImage: string = '';
  cityName: string = '';
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cityImage = params['image'];
      this.cityName = params['city'];
    });
  }

}
