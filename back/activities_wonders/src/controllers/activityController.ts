import Activity from '../../models/activity';

export default class ActivityController {
  async list() {
    return await Activity.findAll();
  }

  async one(id: number) {
    return await Activity.findByPk(id);
  }

  async new(data: {
    name: string;
    url: string;
    description: Text;
    is_free: boolean;
    duration: number;
    price: number;
    partner: string;
    category_id: number;
  }) {
    return Activity.create(data as never);
  }

  async update(
    id: number,
    name: string,
    url: string,
    description: Text,
    is_free: boolean,
    duration: number,
    price: number,
    partner: string,
    category_id: number
  ) {
    const activity = await Activity.findByPk(id);
    if (activity) {
      activity.name = name;
      activity.url = url;
      activity.description = description;
      activity.is_free = is_free;
      activity.duration = duration;
      activity.price = price;
      activity.partner = partner;
      activity.category_id = category_id;
      await activity.save();
      return activity;
    }
    return 'resource not found';
  }

  async delete(id: number) {
    const activity = await Activity.findByPk(id);
    if (activity) {
      await activity.destroy();
    }
    return 'resource not found';
  }
}
