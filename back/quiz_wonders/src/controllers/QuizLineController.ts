import QuizLine from "../models/quizline";
import ResponseKind from "../models/responsekind";

export default class QuizLineController {
    async list() {
        return await QuizLine.findAll({
            include: [
                {
                  model: ResponseKind,
                }
              ]
        });
    }

    async one (id: number) {
        return await QuizLine.findByPk(id);
    }

    async new (quiz_id: number, question: Text, is_required:boolean, is_text: boolean, tag_id: number, response_kind_id: number) {
        return await QuizLine.create({ quiz_id, question, is_required, is_text, tag_id, response_kind_id, created_at: new Date(), updated_at: new Date()});
    }

    async update (id: number ,quiz_id: number, question: Text, is_required:boolean, is_text: boolean, response_kind_id: number, tag_id: number) {
        const quizLine = await QuizLine.findByPk(id);
        if (quizLine) {
            quizLine.question = question;
            quizLine.is_required = is_required;
            quizLine.is_text = is_text;
            quizLine.tag_id = tag_id;
            quizLine.response_kind_id = response_kind_id;
            quizLine.quiz_id = quiz_id;
            await quizLine.save();
        }
        return quizLine;
    }

    async remove (id: number) {
        const quizLine = await QuizLine.findByPk(id);
        if (quizLine) {
            await quizLine.destroy();
        }
        return quizLine;
    }
}