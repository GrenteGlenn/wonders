import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectDetails, Comment } from '../../app/model/Subject';
import { SubjectService } from '../../app/service/subject/subject.service';
import { UsersService } from '../../app/service/users/users.service';
import { CommentService } from '../../app/service/subject/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css'
})
export class SubjectDetailComponent implements OnInit {
  subject: SubjectDetails | null = null;
  id: number = 0;
  user_id: number | null = null;
  newComment: Comment = { message: '', user_id: 0, subject: 0 }

  constructor(
    private route: ActivatedRoute,
    private _userService: UsersService,
    private _subjectService: SubjectService,
    private router: Router,
    private _commentService: CommentService

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')) || 0;
      if (this.id) {
        this.getSubject(this.id);
      }
      this.getMe()
    });
  }

  getMe(): void {
    this._userService.getUserInfo().subscribe({
      next: (data) => {
        this.user_id = data.id;
      },
      error: (error) => {
        console.error('An error occured while fetching me:', error);
      }
    });
  }

  getSubject(id: number): void {
    this._subjectService.getOneSubjects(id).subscribe({
      next: (data: SubjectDetails) => {
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

  createComment(id: number | undefined) {
    if (this.user_id !== null) {
      this._commentService.Create(this.user_id, this.newComment.message, id as number).subscribe({
        next: (data: Comment) => {
          this.newComment = { message: '', user_id: 0, subject: 0 }
          this.getSubject(id as number)
        },

        error: (error) => {
          console.error('Erreur lors de la récupération du sujet:', error);
        }
      })
    }
    ;
  }

  get hasComments(): boolean {
    return !!this.subject?.comments?.length;
  }

  deleteComment(comment: Comment, subject: SubjectDetails): void {
    if (this.user_id === comment.user_id && comment.id && subject) {
      this._commentService.Delete(comment).subscribe({
        next: () => {
          this.getSubject(subject.id as number)
        },

        error: (error) => {
          console.error('Erreur lors de la récupération du sujet:', error);
        }
      });
    }
  }
}
