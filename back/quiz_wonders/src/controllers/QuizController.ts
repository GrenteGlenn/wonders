import Quiz from '../../models/quiz';
import QuizAnswerText from '../../models/quizanswertext';
import QuizLine from '../../models/quizline';
import ResponseKind from '../../models/responsekind';
import Tag from '../../models/tag';

export default class QuizController {
  async listWithInfos() {
    return await Quiz.findAll({
      include: [
        {
          model: QuizLine,
          as: 'quiz_lines',
          separate: true,
          order: [['step', 'ASC']],
          include: [
            {
              model: ResponseKind,
              as: 'response_kind'
            },
            {
              model: QuizAnswerText,
              as: 'quiz_answer_texts'
            },
          ]
        },
        {
          model: Tag,
          as: 'tags'
        }
      ]
    });
  }

  async list() {
    return await Quiz.findAll();
  }

  async one(id: number) {
    return await Quiz.findByPk(id);
  }

  async oneWithInfos(id: number) {
    return await Quiz.findByPk(id, {
      include: [
        {
          model: QuizLine,
          as: 'quiz_lines',
          separate: true,
          order: [['step', 'ASC']],
          include: [
            {
              model: ResponseKind,
              as: 'response_kind'
            },
            {
              model: QuizAnswerText,
              as: 'quiz_answer_texts'
            }
          ]
        },
        {
          model: Tag,
          as: 'tags'
        }
      ]
    });
  }

  async getQuizWithQuestions(quizId: number) {
    const quiz = await Quiz.findOne({
      where: { id: quizId },
      include: [
        {
          model: QuizLine,
          as: 'quizLines'
        }
      ]
    });

    return quiz;
  }

  async new(name: string, tag_id: number, created_at: Date, updated_at: Date) {
    return await Quiz.create({ name, tag_id, created_at, updated_at });
  }

  async update(id: number, name: string, tag_id: number, updated_at: Date) {
    const quiz = await Quiz.findByPk(id);
    if (quiz) {
      quiz.name = name;
      quiz.tag_id = tag_id;
      quiz.updated_at = updated_at;
      await quiz.save();
      return quiz;
    }
  }

  async remove(id: number) {
    const quiz = await Quiz.findByPk(id);
    if (quiz) {
      await quiz.destroy();
      return quiz;
    }
  }
}
