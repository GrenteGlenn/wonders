import Tag from './TagInterface'

export default interface QuizLineInterface {
  id?: number;
  quizId: number;
  question: Text;
  isText?: boolean;
  isBoolean?: boolean;
  isRequired: boolean;
  tag: Tag;
  createdAt?: Date;
  updatedAt?: Date;
}