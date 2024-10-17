import ResetPassword from '../../models/reset_password';
import ResetPasswordInterface from '../interfaces/ResetPasswordInterface';

export default class ResetPasswordController {
  async list() {
    return await ResetPassword.findAll();
  }

  async getOne(id: number) {
    return await ResetPassword.findByPk(id);
  }

  async getByUser(user_id: number) {
    return await ResetPassword.findOne({ where: { user_id: user_id } });
  }

  async getOneByToken(token: string) {
    console.log(token);
    return await ResetPassword.findOne({ where: { token: token } });
  }

  async create(resetPassword: ResetPasswordInterface) {
    return await ResetPassword.create(resetPassword);
  }

  async update(id: number, resetPassword: ResetPasswordInterface) {
    const check = await ResetPassword.findByPk(id);
    if (check) {
      await check.update(resetPassword);
    }
    return check;
  }

  async delete(id: number) {
    const check = await ResetPassword.findByPk(id);
    if (check) {
      await check.destroy();
    }
    return check;
  }
}
