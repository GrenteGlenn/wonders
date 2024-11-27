import Review from '../../models/review';

export default class ReviewController {
  async list() {
    return await Review.findAll();
  }

  async one(id: number) {
    return await Review.findByPk(id);
  }

  async new(data: { rating_id: number; user_id: number; activity_id: number; comment: Text }) {
    const review = await Review.create(data);
    return review;
  }

  async update(id: number, rating_id: number, user_id: number, activity_id: number, comment: Text) {
    const review = await Review.findByPk(id);
    if (review) {
      review.rating_id = rating_id;
      review.user_id = user_id;
      review.activity_id = activity_id;
      review.comment = comment;
      await review.save();
    }
    return review;
  }

  async delete(id: number) {
    const review = await Review.findByPk(id);
    if (review) {
      await review.destroy();
    }
    return 'resource had been deleted';
  }
}
