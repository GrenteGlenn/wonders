import TripDayActivity from '../../models/tripdayactivity';
import { Status } from '../interfaces/Global';
import TripDay from '../../models/tripday';

export default class TripDayActivityController {
  async list() {
    return await TripDayActivity.findAll();
  }

  async listWithDay() {
    return await TripDayActivity.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at']
      },
      include: [
        {
          model: TripDay,
          as: 'tripDay',
          attributes: {
            exclude: ['created_at', 'updated_at']
          }
        }
      ]
    });
  }

  async one(id: number) {
    return await TripDayActivity.findByPk(id);
  }

  async new(trip_day_id: number, activity_id: number, status: Status, created_at: Date, updated_at: Date) {
    return await TripDayActivity.create({ trip_day_id, activity_id, status, created_at, updated_at });
  }

  async update(id: number, trip_day_id: number, activity_id: number, status: Status, updated_at: Date) {
    const tripDayActivity = await TripDayActivity.findByPk(id);
    if (tripDayActivity) {
      tripDayActivity.activity_id = activity_id;
      tripDayActivity.trip_day_id = trip_day_id;
      tripDayActivity.status = status;
      tripDayActivity.updated_at = updated_at;
      await tripDayActivity.save();
      return tripDayActivity;
    }
  }

  async delete(id: number) {
    const tripDayActivity = await TripDayActivity.findByPk(id);
    if (tripDayActivity) {
      await tripDayActivity.destroy();
    }
  }
}
