import Subject from '../../models/subject';
import Topic from '../../models/topic';
import Comment from '../../models/comment';
import { Sequelize } from "sequelize";

export default class TopicController {
  async list() {
    return await Topic.findAll({
      attributes: ["country_id", "name"],
      include: [
        {
          model: Subject,
          as: "subjects",
          attributes: [
            "id",
            "title",
            "content",
            [
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM "user_subjects" 
                WHERE "user_subjects"."subject_id" = "subjects"."id"
              )`),
              "likes",
            ],
          ],
          include: [
            {
              model: Comment,
              as: "comments",
              attributes: ["id", "message", "user_id"],
            },
          ],
        },
      ],
    });
  }

  async one(id: number) {
    return await Topic.findByPk(id, {
      attributes: ["country_id", "name"],
      include: [
        {
          model: Subject,
          as: "subjects",
          attributes: [
            "id",
            "title",
            "content",
            [
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM "user_subjects" 
                WHERE "user_subjects"."subject_id" = "subjects"."id"
              )`),
              "likes",
            ],
          ],
          include: [
            {
              model: Comment,
              as: "comments",
              attributes: ["id", "message", "user_id"],
            },
          ],
        },
      ],
    });
  }

  async new(country_id: number, name: string, created_at: Date) {
    try {
      return await Topic.create({ country_id, name, created_at });
    } catch (error: unknown) {
      console.error('Error creating a topic:', error);
    }
  }

  async update(id: number, country_id: number, name: string, updated_at: Date) {
    const topic = await Topic.findByPk(id);
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
