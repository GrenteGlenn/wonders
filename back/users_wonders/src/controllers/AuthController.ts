import User from '../../models/user';
import UserInterface from '../interfaces/UserInterface';
import { encryptPassword } from '../lib/CheckPassword';

export default class AuthController {
  async list() {
    return await User.findAll();
  }

  async getOne(id: number) {
    return await User.findByPk(id);
  }

  async getOneByEmail(email: string) {
    const user = await User.findOne({ where: { email: email } });
    
    if (user) return user;
    else return null;
  }

  async create(user: UserInterface) {
    const date = new Date();
    user.created_at = date;
    user.updated_at = date;
    return await User.create(user);
  }

  async update(id: number, user: UserInterface) {
    const client = await User.findByPk(id);
    if (client) {
      client.first_name = user.first_name;
      client.last_name = user.last_name;
      client.email = user.email;
      client.birth_date = user.birth_date;
      client.language_id = user.language_id;
      await client.save();
    }
    return client;
  }

  async updatePassword(id: number, password: string) {
    const client = await User.findByPk(id);
    if (client) {
      client.password = await encryptPassword(password);
      await client.save();
    }
    return client;
  }

  async remove(id: number) {
    const client = await User.findByPk(id);
    if (client) {
      await client.destroy();
    }
    return client;
  }
}
