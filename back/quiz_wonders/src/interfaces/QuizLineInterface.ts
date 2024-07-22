export default interface QuizLineInterface {
  id: number;
  quiz_id: number;
  question: Text;
  is_text?: boolean;
  is_boolean?: boolean;
  is_required: boolean;
  tag_id: number;
  response_kind_id: number;
  created_at?: Date;
  updated_at?: Date;
}
