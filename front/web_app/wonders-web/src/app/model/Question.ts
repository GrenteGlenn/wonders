export interface ResponseKind {
  id: number;
  type: string;
}

export interface Quiz {
  id: number;
  name: string;
}

export interface QuizLine {
  id: number;
  question: string;
  is_boolean: boolean;
  step: number;
  is_text: boolean;
  is_required: boolean;
  response_kind: ResponseKind;
  quiz: Quiz;
}

export interface QuizAnswer {
  id: number;
  answer: string;
  quiz_line_id: number;
}

export interface QuizQuestion {
  questionData: QuizLine;
  answers: QuizAnswer[];
}