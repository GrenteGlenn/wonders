import Trip from '../../models/trip';
import TripTransportation from '../../models/triptransportation';
import TripCity from '../../models/tripcity';
import TripDay from '../../models/tripday';
import TripDayActivity from '../../models/tripdayactivity';
import TripInterface from '../interfaces/TripInterface';
import TripTransportationInterface from '../interfaces/TripTransportationInterface';
import { City } from '../interfaces/Global';
import TripHotel from '../../models/triphotel';

export default class TripController {
  async fullTrips(id: number) {
    const trips = await Trip.findAll({
      where: { user_id: id },
      attributes: {
        exclude: ['created_at', 'updated_at', 'transportation_id']
      },
      include: [
        {
          model: TripTransportation,
          as: 'trip_transportation',
          attributes: {
            exclude: ['id', 'created_at', 'updated_at']
          }
        },
        {
          model: TripCity,
          as: 'cities',
          attributes: {
            exclude: ['trip_city_id', 'transportation_id', 'created_at', 'updated_at']
          },
          include: [
            {
              model: TripDay,
              as: 'tripCityDays',
              attributes: {
                exclude: ['created_at', 'updated_at']
              },
              include: [
                {
                  model: TripDayActivity,
                  as: 'activities',
                  attributes: {
                    exclude: ['trip_day_id', 'created_at', 'updated_at']
                  }
                }
              ]
            },
            {
              model: TripTransportation,
              as: 'transportation',
              attributes: {
                exclude: ['created_at', 'updated_at']
              }
            }
          ]
        }
      ]
    });

    return trips;
  }

  async createFullTrip(trip: TripInterface, tripTransportation: TripTransportationInterface, tripCities: City[]) {
    // Save trip transportation detail
    const tripTransportationResponseOne = await TripTransportation.create({
      ...tripTransportation,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Save trip User detail
    if (tripTransportationResponseOne.id === undefined) {
      throw new Error('Missing transportation ID');
    }
    const tripResponse = await Trip.create({
      ...trip,
      transportation_id: tripTransportationResponseOne.id,
      created_at: new Date(),
      updated_at: new Date()
    });

    for (const city of tripCities) {
      const { city_id, transportations, tripCityDays, tripDayActivities, tripCityHotel } = city;
      // save trip transportation avec landing
      const tripTransportResponse = await TripTransportation.create({
        ...transportations,
        created_at: new Date(),
        updated_at: new Date()
      });
      // save city for trip
      if (!tripTransportResponse.id) {
        throw new Error('Missing transport response ID');
      }
      if (!tripResponse.id) {
        throw new Error('Missing trip ID');
      }
      
      const tripCityResponse = await TripCity.create({
        city_id,
        transportation_id: tripTransportResponse.id,
        trip_id: tripResponse.id,
        created_at: new Date(),
        updated_at: new Date()
      });
      // save hotel
      await TripHotel.create({
        ...tripCityHotel,
        created_at: new Date(),
        updated_at: new Date()
      });

      if (tripCityDays) {
        for (const day of tripCityDays) {
          if (!tripCityResponse.id) {
            throw new Error('Missing trip city ID');
          }
          
          const tripCityDayResponse = await TripDay.create({
            date: day.date,
            trip_city_id: tripCityResponse.id,
            created_at: new Date(),
            updated_at: new Date()
          });

          await Promise.all(
            tripDayActivities.map(async (activity) => {
              if (!tripCityDayResponse.id) {
                throw new Error('Missing trip day ID');
              }
              
              await TripDayActivity.create({
                activity_id: activity.activity_id,
                trip_day_id: tripCityDayResponse.id,
                status: activity.status,
                created_at: new Date(),
                updated_at: new Date()
              });
            })
          );
        }
      }
    }
  }

  async fullTrip(id: number) {
    return await Trip.findOne({
      where: { id: id },
      attributes: {
        exclude: ['created_at', 'updated_at', 'transportation_id']
      },
      include: [
        {
          model: TripTransportation,
          as: 'trip_transportation',
          attributes: {
            exclude: ['id', 'created_at', 'updated_at']
          }
        },
        {
          model: TripCity,
          as: 'cities',
          attributes: {
            exclude: ['trip_city_id', 'transportation_id', 'created_at', 'updated_at']
          },
          include: [
            {
              model: TripDay,
              as: 'tripCityDays',
              attributes: {
                exclude: ['created_at', 'updated_at']
              },
              include: [
                {
                  model: TripDayActivity,
                  as: 'activities',
                  attributes: {
                    exclude: ['trip_day_id', 'created_at', 'updated_at']
                  }
                }
              ]
            },
            {
              model: TripTransportation,
              as: 'transportation',
              attributes: {
                exclude: ['created_at', 'updated_at']
              }
            }
          ]
        }
      ]
    });
  }

  async list() {
    return await Trip.findAll();
  }

  async one(id: number) {
    const trip = await Trip.findByPk(id);
    if (trip) {
      return trip;
    }
  }

  async new(
    user_id: number,
    country_id: number,
    duration: number,
    from_date: Date,
    to_date: Date,
    transportation_id: number,
    created_at: Date,
    updated_at: Date
  ) {
    return await Trip.create({
      user_id,
      country_id,
      duration,
      from_date,
      to_date,
      transportation_id,
      created_at,
      updated_at
    });
  }

  async update(
    id: number,
    user_id: number,
    country_id: number,
    duration: number,
    fromDate: Date,
    toDate: Date,
    transportation_id: number,
    updated_at: Date
  ) {
    const trip = (await Trip.findByPk(id)) as Trip;

    trip.user_id = user_id;
    trip.country_id = country_id;
    trip.duration = duration;
    trip.from_date = fromDate;
    trip.to_date = toDate;
    trip.transportation_id = transportation_id;
    trip.updated_at = updated_at;
    await trip.save();
    return trip;
  }

  async delete(id: number) {
    const trip = await Trip.findByPk(id);
    return await trip?.destroy();
  }
}
