export default interface QuizLineInterface {
  id: number;
  quiz_id?: number;
  question: string;
  is_text?: boolean;
  is_boolean?: boolean;
  is_required: boolean;
  step?: number;
  mutiple_type_answer: boolean;
  parent?: boolean;
  response_kind_id: number;
  created_at?: Date;
  updated_at?: Date;
}
