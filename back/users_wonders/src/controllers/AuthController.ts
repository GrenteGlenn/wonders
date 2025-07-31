import User from '../../models/user';
import { UserInterface, UserUpdateInterface } from '../interfaces/UserInterface';
import { encryptPassword } from '../lib/CheckPassword';
import Role from '../../models/role';

export default class AuthController {
  async list() {
    return await User.findAll({
      attributes: {
        exclude: ['role_id']
      },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['role']
        }
      ]
    });
  }

  async listId({ ids }: { ids: number[] }) {
    return await User.findAll({
      where: { id: ids },
      attributes: {
        exclude: ['created_at', 'updated_at', 'country_id', 'language_id', 'password', 'img', 'role_id']
      }
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

  async update(id: number, user: UserUpdateInterface) {
    const client = await User.findByPk(id);
    if (client) {
      client.first_name = user.first_name;
      client.last_name = user.last_name;
      client.email = user.email;
      client.birth_date = user.birth_date;
      if (user.img) client.img = user.img;
      else client.img;
      if (user.country_id) client.country_id = user.country_id;
      else client.country_id;
      if (user.language_id) client.language_id = user.language_id;
      else client.language_id;
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
