import Topic from '../../models/topic'

export default class TopicController {
    async list() {
        return await Topic.findAll()
    }

    async one(id: number) {
        return await Topic.findByPk(id)
    }

    async new(country_id: number, name: string, created_at: Date) {
        try {
            return await Topic.create({ country_id, name, created_at })
        } catch (error: unknown) {
            console.error('Error creating a topic:', error);
        }
    }

    async update(id: number, country_id: number, name: string, updated_at: Date) {
        const topic = await Topic.findByPk(id)
        try {
            if (!topic) {
                return { status: 404, message: 'Topic not found' };
            }

            topic.name = name;
            topic.country_id = country_id;
            topic.updated_at = updated_at;
            await topic.save();
            return topic;

        } catch (error) {
            console.error('Error while updating a topic:', error);
        }
    }

    async delete(id: number) {
        try {
            const trip = await Topic.findByPk(id);
      
            if (!trip) {
              console.warn('Topic not found');
            } else {
              await trip.destroy();
            }
          } catch (error) {
            console.error('Error deleting topic:', error);
          }
    }
}