export default interface QuizAnswerText {
  id: number;
  answer: string;
  quiz_line_id: number;
  created_at?: Date;
  updated_at?: Date;
}
