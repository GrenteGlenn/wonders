import Quiz from "../models/quiz";
import QuizLine from "../models/quizline";

export default class QuizController {
    async list() {
        return await Quiz.findAll();
    }

    async one(id: number) {
        return await Quiz.findByPk(id);
    }

    async getQuizWithQuestions(quizId: number) {
        const quiz =  await Quiz.findOne({
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

    async new (name: string) {
        return await Quiz.create({ name, createdAt: new Date(), updatedAt: new Date() });
    }

    async update (id:number , name:string) {
        const quiz = await Quiz.findByPk(id);
        if(quiz) {
            quiz.name = name;
            await quiz.save();
        }
    }

    async remove(id:number) {
        const quiz = await Quiz.findByPk(id);
        if(quiz) {
            await quiz.destroy();
        }
    }
}