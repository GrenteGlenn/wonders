export default interface UserAnswer {
  id?: number;
  quiz_response_id: number;
  quiz_line_id: number;
  boolean?: boolean;
  text?: string;
  quiz_answer_text_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
