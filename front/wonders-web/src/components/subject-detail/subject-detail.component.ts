import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectDetails, Comment } from '../../app/model/Subject';
import { SubjectService } from '../../app/service/subject/subject.service';
import { UsersService } from '../../app/service/users/users.service';
import { CommentService } from '../../app/service/subject/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css'
})
export class SubjectDetailComponent implements OnInit {
  subject: SubjectDetails | null = null;
  id: number = 0;
  user_id: number | null = null;
  newComment: Comment = { message: '', user_id: 0, subject: 0 };

  // pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedComments: Comment[] = [];
  totalCommentPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _userService: UsersService,
    private _subjectService: SubjectService,
    private router: Router,
    private _commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id')) || 0;
      if (this.id) {
        this.getSubject(this.id);
      }
      this.getMe();
    });
  }

  getMe(): void {
    this._userService.getUserInfo().subscribe({
      next: (data) => {
        console.log(data, 'data');

        this.user_id = data.id;
      },
      error: (error) => {
        console.error('An error occured while fetching me:', error);
      }
    });
  }

  async getSubject(id: number): Promise<void> {
    try {
      const data = await this._subjectService.getOneSubjects(id).toPromise();
      this.subject = data ?? null;

      if (!this.subject?.comments?.length) {
        this.paginateComments();
        return;
      }

      // Charge les utilisateurs des commentaires
      const commentUserRequests = this.subject.comments.map(async (comment) => {
        try {
          const user = await this._userService.getUserInfoByUserID(comment.user_id).toPromise();
          comment.user = user;
        } catch (err) {
          comment.user = undefined;
        }
      });

      await Promise.all(commentUserRequests);
      this.paginateComments();
    } catch (error) {
      console.error('Erreur lors de la récupération du sujet:', error);
    }
  }

  paginateComments(): void {
    if (!this.subject?.comments) return;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.totalCommentPages = Math.ceil(this.subject.comments.length / this.itemsPerPage);
    this.paginatedComments = this.subject.comments.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalCommentPages) {
      this.currentPage = page;
      this.paginateComments();
    }
  }

  // voir retour en arrière
  viewDetails(id: number): void {
    this.router.navigate(['/subjects', id]);
  }

  createComment(id: number | undefined) {
    if (this.user_id !== null) {
      this._commentService.Create(this.user_id, this.newComment.message, id as number).subscribe({
        next: (data: Comment) => {
          this.newComment = { message: '', user_id: 0, subject: 0 };
          this.getSubject(id as number);
        },

        error: (error) => {
          console.error('Erreur lors de la récupération du sujet:', error);
        }
      });
    }
  }

  get hasComments(): boolean {
    return !!this.subject?.comments?.length;
  }

  deleteComment(comment: Comment, subject: SubjectDetails | null): void {
    if (this.user_id === comment.user_id && comment.id && subject && subject.id) {
      this._commentService.Delete(comment).subscribe({
        next: () => {
          this.getSubject(subject.id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du commentaire:', error);
        }
      });
    }
  }
}
