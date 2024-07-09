import User from '../../models/user';

export default class AuthController {
  async list() {
    return await User.findAll();
  }

  // async new(name: string) {
  //     return await User.create({name, createdAt: new Date(), updatedAt: new Date()});
  // }

  // async update(id: number, name: string) {
  //     const quiz = await User.findByPk(id);
  //     if (quiz) {
  //         quiz.name = name;
  //         await quiz.save();
  //     }
  // }
  //
  // async remove(id: number) {
  //     const quiz = await User.findByPk(id);
  //     if (quiz) {
  //         await quiz.destroy();
  //     }
  // }
}
