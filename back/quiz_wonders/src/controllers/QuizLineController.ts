import { DateDataTypeOptions } from "sequelize";
import QuizLine from "../models/quizline";

export default class QuizLineController {
    async list() {
        return await QuizLine.findAll();
    }

    async one (id: number) {
        return await QuizLine.findByPk(id);
    }

    async new (quiz: number, question: Text, isRequired:boolean, isText: boolean, tag_id: number) {
        return await QuizLine.create({ quiz, question, isRequired, isText, tag_id});
    }

    async update (id: number,question: Text, isRequired:boolean, isText: boolean, tag: number) {
        const quizLine = await QuizLine.findByPk(id);
        if (quizLine) {
            quizLine.question = question;
            quizLine.isRequired = isRequired;
            quizLine.isText = isText;
            quizLine.tag = tag;
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