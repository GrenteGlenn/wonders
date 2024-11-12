import Trip from '../../models/trip';
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

  async new(user_id: number, country_id: number, duration: number, from: Date, to: Date, transportation_id: number, created_at: Date, updated_at: Date) {
    return await Trip.create({ user_id, country_id, duration, from, to, transportation_id, created_at, updated_at })
  }

  async update(
    id: number,
    user_id: number,
    country_id: number,
    duration: number,
    from: Date,
    to: Date,
    transportation_id: number,
    created_at: Date,
    updated_at: Date
  ) {
    const trip = await Trip.findByPk(id) as any;

    trip.user_id = user_id;
    trip.country_id = country_id;
    trip.duration = duration;
    trip.from = from;
    trip.to = to;
    trip.transportation_id = transportation_id;
    await trip.save();
    return trip;
  }

  async delete(id: number) {
    const trip = await Trip.findByPk(id);
    return await trip?.destroy();
  }
}