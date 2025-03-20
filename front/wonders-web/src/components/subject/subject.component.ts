import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from '../../app/model/Subject';
import { SubjectService } from '../../app/service/subject/subject.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  topic_id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _subjectService: SubjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.topic_id = Number(params.get('id')) || 0;
      if (this.topic_id) {
        this.getSubjects(this.topic_id);
      }
    });
  }

  getSubjects(topic_id: number): void {
    this._subjectService.getAllSubjects(topic_id).subscribe({
      next: (data: Subject[]) => {
        console.log(data);
        this.subjects = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des sujets:', error);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/subjects', id]);
  }
}
