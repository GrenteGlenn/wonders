import ActivityCategory from '../../models/activityCategory';

export default class ActivityCategoryController {
  async list() {
    return await ActivityCategory.findAll();
  }

  async one(id: number) {
    const activityCategory = await ActivityCategory.findByPk(id);
    if (activityCategory) {
      return activityCategory;
    }
  }

  async new(data: { name: string; picture_id: number }) {
    return await ActivityCategory.create(data as any);
  }

  async update(id: number, name: string, picture_id: number) {
    const activityCategory = await ActivityCategory.findByPk(id);
    if (activityCategory) {
      activityCategory.name = name;
      activityCategory.picture_id = picture_id;
      await activityCategory.save();
      return activityCategory;
    }
  }

  async delete(id: number) {
    const activityCategory = await ActivityCategory.findByPk(id);
    if (activityCategory) {
      await activityCategory.destroy();
    }
  }
}
