import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectDetails } from '../../app/model/Subject';
import { SubjectService } from '../../app/service/subject/subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css'
})
export class SubjectDetailComponent implements OnInit {
  subject: SubjectDetails | null = null;  // subject est initialisé à null
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _subjectService: SubjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')) || 0;
      if (this.id) {
        this.getSubject(this.id);
      }
    });
  }

  getSubject(id: number): void {
    this._subjectService.getOneSubjects(id).subscribe({
      next: (data: SubjectDetails) => {
        console.log(data);
        this.subject = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du sujet:', error);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/subjects', id]);
  }

  createSubject(id: number) {
    console.log("ta mere suce des bites");
    
  }

  get hasComments(): boolean {
    return !!this.subject?.comments?.length;
  }
}
