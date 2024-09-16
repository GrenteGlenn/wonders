import QuizAnswerText from '../models/quizanswertext';

export default class QuizAnswerTextController {
  async list() {
    return await QuizAnswerText.findAll();
  }

  async one(id: number) {
    return await QuizAnswerText.findByPk(id);
  }

  async new(answer: string, quiz_line_id: number, created_at: Date, updated_at: Date) {
    return await QuizAnswerText.create({ answer, quiz_line_id, created_at, updated_at });
  }

  async update(id: number, answer: string, quiz_line_id: number, created_at: Date, updated_at: Date) {
    const quiz_answer_text = await QuizAnswerText.findByPk(id);
    if (quiz_answer_text) {
      quiz_answer_text.answer = answer;
      quiz_answer_text.quiz_line_id = quiz_line_id;
      await quiz_answer_text.save();
    }
    return quiz_answer_text;
  }

  async delete(id: number) {
    const quiz_answer_text = await QuizAnswerText.findByPk(id);
    if (quiz_answer_text) {
      await quiz_answer_text.destroy();
    }
    return quiz_answer_text;
  }
}
