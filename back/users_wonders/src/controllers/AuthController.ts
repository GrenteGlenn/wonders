import User from '../../models/user';
import UserInterface from '../interfaces/UserInterface';
import { encryptPassword } from '../lib/CheckPassword';
import Role from '../../models/role';

export default class AuthController {
  async list() {
    return await User.findAll({
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['role']
        }
      ]
    });
  }

  async getOne(id: number) {
    return await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['role']
        }
      ]
    });
  }

  async getOneByEmail(email: string) {
    const user = await User.findOne({
      where: { email: email },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['role']
        }
      ]
    });
    if (user) return user;
    else return null;
  }

  async create(user: UserInterface) {
    return await User.create(user);
  }

  async update(id: number, user: UserInterface) {
    const client = await User.findByPk(id);
    if (client) {
      client.country_id = user.country_id;
      client.first_name = user.first_name;
      client.last_name = user.last_name;
      client.img = user.img;
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
