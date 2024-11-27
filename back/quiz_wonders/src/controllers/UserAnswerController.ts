import UserAnswer from '../../models/useranswer';

export default class UserAnswerController {
  async list() {
    try {
      return await UserAnswer.findAll();
    } catch (error) {
      return console.log(error);
    }
  }

  async one(id: number) {
    try {
      return await UserAnswer.findByPk(id);
    } catch (error) {
      return console.log(error);
    }
  }

  async new(
    quiz_answer_text_id: number | undefined,
    quiz_line_id: number | undefined,
    quiz_response_id: number | undefined,
    boolean: boolean | undefined,
    text: string | undefined,
    created_at: Date,
    updated_at: Date
  ) {
    try {
      return await UserAnswer.create({
        quiz_answer_text_id,
        quiz_line_id,
        boolean,
        quiz_response_id,
        text,
        created_at,
        updated_at
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(
    id: number,
    quiz_answer_text_id: number | undefined,
    quiz_line_id: number | undefined,
    quiz_response_id: number | undefined,
    boolean: boolean | undefined,
    text: string | undefined
  ) {
    try {
      const userAnswer = await UserAnswer.findByPk(id);
      if (userAnswer) {
        userAnswer.quiz_answer_text_id = quiz_answer_text_id;
        userAnswer.quiz_line_id = quiz_line_id;
        userAnswer.quiz_response_id = quiz_response_id;
        userAnswer.boolean = boolean;
        userAnswer.text = text;
        await userAnswer.save();
      }
      return userAnswer;
    } catch (error) {
      return console.log(error);
    }
  }

  async delete(id: number) {
    try {
      return await UserAnswer.destroy({ where: { id } });
    } catch (error) {
      return console.log(error);
    }
  }
}
