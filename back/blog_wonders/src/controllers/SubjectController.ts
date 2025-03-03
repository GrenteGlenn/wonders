import Subject from '../../models/subject';

export default class SubjectController {
  async list() {
    return await Subject.findAll();
  }

  async one(id: number) {
    return await Subject.findByPk(id);
  }

  async new(title: string, content: string, user_id: number, topic: number, created_at: Date) {
    try {
      return await Subject.create({ title, content, user_id, topic, created_at });
    } catch (error: unknown) {
      console.error('Error creating a topic:', error);
    }
  }

  async update(id: number, title: string, content: string, user_id: number, topic: number, updated_at: Date) {
    const _topic = await Subject.findByPk(id);
    try {
      if (!_topic) {
        return { status: 404, message: 'Topic not found' };
      }

      _topic.title = title;
      _topic.content = content;
      _topic.user_id = user_id;
      _topic.topic = topic;
      _topic.updated_at = updated_at;
      await _topic.save();
      return _topic;
    } catch (error) {
      console.error('Error while updating a subject:', error);
    }
  }

  async delete(id: number) {
    try {
      const trip = await Subject.findByPk(id);

      if (!trip) {
        console.warn('Subject not found');
      } else {
        await trip.destroy();
      }
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  }
}
