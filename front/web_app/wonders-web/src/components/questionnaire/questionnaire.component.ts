import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionnaireService } from '../../app/service/questionnaire/questionnaire.service';
import { Questionnaire } from '../../app/model/Questionnaire';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css'
})
export class QuestionnaireComponent implements OnInit {
  error_msg: string = '';
  questionnaire: Questionnaire = {title: '', questionnaire: []};
  private subscription!: Subscription;


  constructor(private _questionnaireService: QuestionnaireService) {}

  ngOnInit(): void {
    this.subscription = this._questionnaireService.getQuestionnaire().subscribe({
      next: (data) => {
        this.error_msg = '';
        this.questionnaire = data;
      },
      error: (err) => {
        this.error_msg = 'Erreur lors de la récupération des informations';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
