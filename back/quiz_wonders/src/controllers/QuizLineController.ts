import Quiz from '../../models/quiz';
import QuizLine from '../../models/quizline';
import ResponseKind from '../../models/responsekind';

export default class QuizLineController {
  async list() {
    return await QuizLine.findAll({
      include: [
        {
          model: ResponseKind,
          as: 'response_kind'
        },
        {
          model: Quiz,
          as: 'quiz'
        },
        {
          model: QuizLine,
          as: 'childrens',
          required: false
        }
      ]
    });
  }

  async one(id: number) {
    return await QuizLine.findByPk(id, {
      include: [
        {
          model: ResponseKind,
          as: 'response_kind'
        },
        {
          model: Quiz,
          as: 'quiz'
        },
        {
          model: QuizLine,
          as: 'ParentQuizLine',
          required: false,
          foreignKey: 'parent'
        }
      ]
    });
  }

  async new(data: {
    quiz_id: number | undefined;
    question: string;
    is_required: boolean;
    is_text: boolean | undefined;
    is_boolean: boolean | undefined;
    mutiple_type_answer: boolean;
    parent: boolean | undefined;
    response_kind_id: number;
    step: number | undefined;
  }) {
    return await QuizLine.create(data);
  }

  async update(
    id: number,
    quiz_id: number | undefined,
    question: string,
    is_required: boolean,
    is_text: boolean | undefined,
    is_boolean: boolean | undefined,
    mutiple_type_answer: boolean,
    parent: boolean | undefined,
    response_kind_id: number,
    step: number | undefined
  ) {
    const quizLine = await QuizLine.findByPk(id);
    if (quizLine) {
      quizLine.question = question;
      quizLine.is_required = is_required;
      quizLine.is_text = is_text;
      quizLine.is_boolean = is_boolean;
      quizLine.mutiple_type_answer = mutiple_type_answer;
      quizLine.response_kind_id = response_kind_id;
      quizLine.parent = parent;
      quizLine.quiz_id = quiz_id;
      quizLine.step = step;
      await quizLine.save();
    }
    return quizLine;
  }

  async remove(id: number) {
    const quizLine = await QuizLine.findByPk(id);
    if (quizLine) {
      await quizLine.destroy();
    }
    return quizLine;
  }
}
