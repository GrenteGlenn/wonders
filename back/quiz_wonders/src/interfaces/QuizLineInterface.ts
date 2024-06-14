export default interface QuizLineInterface {
    id?: number;
    quizId?: number;
    question?: string | null;
    isText?: boolean;
    isBoolean?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}