import TripHotel from '../../models/triphotel';
import TripHotelInterface from '../interfaces/TripHotelInterface';

export default class TripHotelController {
  async list() {
    return await TripHotel.findAll();
  }

  async one(id: number) {
    return await TripHotel.findByPk(id);
  }

  async new(hotel: TripHotelInterface, created_at: Date, updated_at: Date) {
    return await TripHotel.create({
      ...hotel,
      created_at: created_at,
      updated_at: updated_at
    });
  }

  async update(id: number, hotel: TripHotelInterface, updated_at: Date) {
    const tripHotel = await TripHotel.findByPk(id);
    if (tripHotel) {
      tripHotel.name = hotel.name;
      tripHotel.trip_city_id = hotel.trip_city_id;
      tripHotel.from = hotel.from;
      tripHotel.price = hotel.price;
      tripHotel.to = hotel.to;
      tripHotel.url = hotel.url;
      tripHotel.adults = hotel.adults;
      tripHotel.children = hotel.children;
      tripHotel.longitude = hotel.longitude;
      tripHotel.latitude = hotel.latitude;
      tripHotel.status = hotel.status;
      tripHotel.updated_at = updated_at;
      await tripHotel.save();
      return tripHotel;
    }
  }

  async delete(id: number) {
    const tripHotel = await TripHotel.findByPk(id);
    return tripHotel?.destroy();
  }
}
