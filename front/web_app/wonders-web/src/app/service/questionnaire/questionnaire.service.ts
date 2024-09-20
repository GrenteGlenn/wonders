import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questionnaire } from '../../model/Questionnaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  configUrl = "assets/mock/questionnaire.json";

  constructor(
    private http: HttpClient
  ) { }

  //Obtenir un questionnaire
  getQuestionnaire(): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(this.configUrl);
  }
}
