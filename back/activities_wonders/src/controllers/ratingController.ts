import Rating from '../../models/rating';

export default class RatingController {
  async list() {
    return await Rating.findAll();
  }

  async one(id: number) {
    return await Rating.findByPk(id);
  }

  async new(data: { rating: number }) {
    return await Rating.create(data as never);
  }

  async update(id: number, rating: number) {
    const res = await Rating.findByPk(id);
    if (res) {
      res.rating = rating;
      await res.save();

      return res;
    }
  }

  async delete(id: number) {
    const res = await Rating.findByPk(id);
    if (res) {
      await res.destroy();
      return res;
    }
  }
}
