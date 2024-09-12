import Review from '../../models/review';
import { NullishPropertiesOf } from 'sequelize/types/utils';

interface Data {
  rating_id: number;
  user_id: number;
  activity_id: number;
  comment: Text;
}

type DataOmit = Omit<Data, NullishPropertiesOf<Data>>;

export default class ReviewController {
  async list() {
    return await Review.findAll();
  }

  async one(id: number) {
    return await Review.findByPk(id);
  }

  async new(data: { rating_id: number; user_id: number; activity_id: number; comment: Text }) {
    const value: DataOmit = {
      comment: data.comment,
      rating_id: data.rating_id,
      user_id: data.user_id,
      activity_id: data.activity_id
    };
    return await Review.create(value);
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
