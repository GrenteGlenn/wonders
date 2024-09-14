import QuizAnswerText from '../models/quizanswertext';
import QuizLine from '../models/quizline';
import QuizResponse from '../models/quizresponse';
import UserAnswer from '../models/useranswer';

export default class QuizResponseController {
  async list() {
    try {
      return await QuizResponse.findAll({
        include: [
          {
            model: UserAnswer,
            as: 'userAnswer',
            include: [
              {
                model: QuizLine,
                as: 'quiz_line'
              },
              {
                model: QuizAnswerText,
                as: 'quiz_answer_texts'
              }
            ]
          }
        ]
      });
    } catch (error) {
      return console.log(error);
    }
  }

  async one(id: number) {
    try {
      return await QuizResponse.findByPk(id);
    } catch (error) {
      return console.log(error);
    }
  }

  async new(quiz_id: number, user_id: number) {
    try {
      return await QuizResponse.create({ quiz_id, user_id });
    } catch (error) {
      return console.log(error);
    }
  }

  async update(id: number, quiz_id: number, user_id: number) {
    try {
      const quizResponse = await QuizResponse.findByPk(id);
      if (quizResponse) {
        quizResponse.quiz_id = quiz_id;
        quizResponse.user_id = user_id;
        await quizResponse.save();
        return quizResponse;
      }
    } catch (error) {
      return console.log(error);
    }
  }

  async delete(id: number) {
    try {
      const quizResponse = await QuizResponse.findByPk(id);
      if (quizResponse) {
        await quizResponse.destroy();
        return quizResponse;
      }
    } catch (error) {
      return console.log(error);
    }
  }
}
