import Trip from '../../models/trip';
import TripTransportation from '../../models/triptransportation';

export default class TripController {
  async list() {
    return await Trip.findAll()
  }

  async one(id: number) {
    const trip = await Trip.findByPk(id)
    if (trip) {
      return trip;
    }
  }

  async new(user_id: number, country_id: number, duration: number, from_date: Date, to_date: Date, transportation_id: number, created_at: Date, updated_at: Date) {
    return await Trip.create({ user_id, country_id, duration, from_date, to_date, transportation_id, created_at, updated_at })
  }

  async update(
    id: number,
    user_id: number,
    country_id: number,
    duration: number,
    fromDate: Date,
    toDate: Date,
    transportation_id: number,
    created_at: Date,
    updated_at: Date
  ) {
    const trip = await Trip.findByPk(id) as any;

    trip.user_id = user_id;
    trip.country_id = country_id;
    trip.duration = duration;
    trip.fromDate = fromDate;
    trip.toDate = toDate;
    trip.transportation_id = transportation_id;
    await trip.save();
    return trip;
  }

  async delete(id: number) {
    const trip = await Trip.findByPk(id);
    return await trip?.destroy();
  }
}