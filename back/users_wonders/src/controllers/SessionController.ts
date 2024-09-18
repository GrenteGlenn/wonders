import Session from '../../models/session';
import SessionInterface from '../interfaces/SessionInterface';

export default class SessionController {
  async list() {
    return await Session.findAll();
  }

  async getOne(id: number) {
    return await Session.findByPk(id);
  }

  async getByUser(user_id: number) {
    return await Session.findByPk(user_id);
  }

  async create(sessionData: SessionInterface) {
    return await Session.create(sessionData);
  }

  async update(id: number, sessionData: SessionInterface) {
    const session = await Session.findByPk(id);
    if (session) {
      await session.update(sessionData);
    }
    return session;
  }

  async delete(id: number) {
    const session = await Session.findByPk(id);
    if (session) {
      await session.destroy();
    }
    return session;
  }
}
