import UserSubject from '../../models/userSubject';

export default class UserSubjectController {
  async create(subject_id: number, user_id: number) {
    try {
      const exists = await UserSubject.findOne({
        where: {
          subject_id: subject_id,
          user_id: user_id
        }
      });
      if (exists) {
        return await exists?.destroy();
      }
      return await UserSubject.create({ user_id, subject_id });
    } catch (error: unknown) {
      console.error('Error creating a like:', error);
    }
  }

  async delete(id: number) {
    try {
      const like = await UserSubject.findByPk(id);
      await like?.destroy();
    } catch (error: unknown) {
      console.error('Error creating a like:', error);
    }
  }
}
