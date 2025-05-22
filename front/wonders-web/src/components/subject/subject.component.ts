import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, InsertSubject } from '../../app/model/Subject';
import { SubjectService } from '../../app/service/subject/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../app/service/users/users.service';
import { FormsModule } from '@angular/forms';
import { User, FetchableUser } from '../../app/model/User';
import { UserLikeService } from '../../app/service/subject/userLike.service';
import { UserLike } from '../../app/model/UserLike';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateService } from '../../app/service/translate/translate.service';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  topic_id: number | null = null;
  isFormVisible: boolean = false;
  user_id: number | null = null;
  newSubject: InsertSubject = {
    title: '',
    content: '',
    user_id: this.user_id as number,
    topic: this.topic_id as number
  };

  //Pagination
  paginatedSubjects: Subject[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _subjectService: SubjectService,
    private _userService: UsersService,
    private _userLikeService: UserLikeService,
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.topic_id = Number(params.get('id')) || 0;
      if (this.topic_id) {
        this.getSubjects(this.topic_id);
      }
      this.getMe();
    });
  }

  getMe(): void {
    this._userService.getUserInfo().subscribe({
      next: (data: FetchableUser) => {
        this.user_id = data.id;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    });
  }

  likeSubject(subject: Subject): void {
    if (!subject || !subject.id || !this.user_id) {
      console.warn('Sujet ou identifiant utilisateur invalide.');
      return;
    }

    this._userLikeService.Create(subject.id, this.user_id).subscribe({
      next: () => {
        if (this.topic_id) {
          this.getSubjects(this.topic_id);
        }
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout du like:', error);
      }
    });
  }

  getSubjects(topic_id: number): void {
    this._subjectService.getAllSubjects(topic_id).subscribe({
      next: (data: Subject[]) => {
        this.subjects = data;
        this.currentPage = 1;
        this.paginateSubjects();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des sujets:', error);
      }
    });
  }
  
  paginateSubjects(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.totalPages = Math.ceil(this.subjects.length / this.itemsPerPage);
    this.paginatedSubjects = this.subjects.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateSubjects();
    }
  }
  

  viewDetails(id: number): void {
    this.router.navigate(['/', this.translateService.currentLang, 'subjects', id]);
  }

  createSubject(): void {
    this._subjectService
      .Create(this.newSubject.title, this.newSubject.content, this.user_id as number, this.topic_id as number)
      .subscribe({
        next: (response) => {
          this.isFormVisible = false;
          this.newSubject = { title: '', content: '', user_id: 0, topic: 0 };
          this.getSubjects(this.topic_id as number);
        },
        error: (error) => {
          console.error('Erreur lors de la création du sujet:', error);
        }
      });
  }

  deleteSubject(id: number): void {
    this._subjectService.Delete(id).subscribe({
      next: () => {
        this.getSubjects(this.topic_id as number);
      },
      error: (error) => {
        console.error('Erreur lors de la création du sujet:', error);
      }
    });
  }
}
