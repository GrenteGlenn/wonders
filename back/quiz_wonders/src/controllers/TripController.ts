import Trip from '../../models/trip';
import TripTransportation from '../../models/triptransportation';
import TripCity from '../../models/tripcity';
import TripDay from '../../models/tripday';
import TripDayActivity from '../../models/tripdayactivity';
import TripInterface from '../interfaces/TripInterface';
import TripTransportationInterface from '../interfaces/TripTransportationInterface';
import { ActivityDetail, City, CityDetail, Country, User } from '../interfaces/Global';
import TripHotel from '../../models/triphotel';

const addressCountry = process.env.ADDRESS_COUNTRY;
const addressUser = process.env.ADDRESS_USER;
const addressActivity = process.env.ADDRESS_ACTIVITY;

export default class TripController {
  async getAllTrips(token: string) {
    const trips = await Trip.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at', 'transportation_id']
      },
      include: [
        {
          model: TripTransportation,
          as: 'trip_transportation',
          attributes: {
            exclude: ['created_at', 'updated_at']
          }
        }
      ]
    });

    // Extraire les Id uniques
    const countryIds = [...new Set(trips.map((t) => t.country_id))];
    const userIds = [...new Set(trips.map((t) => t.user_id))];

    // Appeler les microservices en parallèle
    let countries: [] | Country[] = [];

    await fetch(`${addressCountry}/countries/batch`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: countryIds })
    })
      .then(async (res) => {
        countries = (await res.json()) as Country[];
      })
      .catch((err) => {
        console.log(err);
      });

    let users: [] | User[] = [];

    await fetch(`${addressUser}/users/batch`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: userIds })
    })
      .then(async (res) => {
        users = (await res.json()) as User[];
      })
      .catch((err) => {
        console.log(err);
      });

    const countryMap = Object.fromEntries(countries.map((c) => [c.id, c])) as Country[];
    const userMap = Object.fromEntries(users.map((u) => [u.id, u])) as User[];

    const enrichedTrips = trips.map((trip) => ({
      ...trip.toJSON(),
      country: countryMap[trip.country_id] || null,
      user: userMap[trip.user_id] || null
    }));

    return enrichedTrips;
  }

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
      if (!tripTransportResponse.id) {
        throw new Error('Missing transport response ID');
      }
      if (!tripResponse.id) {
        throw new Error('Missing trip ID');
      }

      // save city for trip
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
        trip_city_id: tripCityResponse.id,
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
            },
            {
              model: TripHotel,
              as: 'hotel',
              attributes: {
                exclude: ['created_at', 'updated_at']
              }
            }
          ]
        }
      ]
    });
  }

  async fullTripDetail(id: number) {
    // Get the TRIP
    const tripDetail = await Trip.findOne({
      where: { id: id },
      attributes: {
        exclude: ['created_at', 'updated_at']
      }
    });

    // Get the Trip Transportation
    if (!tripDetail) return null;
    const transportation = await TripTransportation.findOne({
      where: { id: tripDetail.transportation_id },
      attributes: {
        exclude: ['from_date', 'to_date', 'created_at', 'updated_at']
      }
    });

    // Get All City for the trip
    if (!transportation) return null;
    const tripCity = await TripCity.findAll({
      where: { transportation_id: transportation?.id },
      attributes: {
        exclude: ['created_at', 'updated_at']
      }
    });

    const tripActivity = await TripDayActivity.findAll({
      where: { trip_day_id: tripCity.map((item) => item.trip_id) },
      attributes: {
        exclude: ['created_at', 'updated_at']
      }
    });

    // Extraire les Id uniques
    const countryIds = tripDetail?.country_id;
    const cityIds = [...new Set(tripCity.map((t) => t.city_id))];
    const activityIds = [...new Set(tripActivity.map((t) => t.activity_id))];

    // Appeler les microservices en parallèle
    let countries: Country | null = null;

    await fetch(`${addressCountry}/countries/${countryIds}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(async (res) => {
      countries = (await res.json()) as Country;
    });

    let city: [] | CityDetail[] = [];

    await fetch(`${addressCountry}/cities/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: cityIds })
    }).then(async (res) => {
      city = (await res.json()) as CityDetail[];
    });

    let activity: [] | ActivityDetail[] = [];

    await fetch(`${addressActivity}/activity/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: activityIds })
    }).then(async (res) => {
      activity = (await res.json()) as ActivityDetail[];
    });

    const cityMap = Object.fromEntries(city.map((u) => [u.id, u])) as unknown as CityDetail[];
    const activityMap = Object.fromEntries(activity.map((u) => [u.id, u])) as unknown as ActivityDetail[];

    const value = {
      tripDetail,
      countries,
      cityMap,
      tripActivity,
      activityMap
    };

    return value;
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
