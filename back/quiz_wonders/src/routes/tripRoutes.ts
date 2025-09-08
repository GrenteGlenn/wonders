import { RequestHandler, Router } from 'express';
import TripController from '../controllers/TripController';
import TripInterface from '../interfaces/TripInterface';
import { FullTrip } from '../interfaces/Global';

const router = Router();
const tripController = new TripController();

router.get('/', (async (req, res) => {
  try {
    const trips = await tripController.list();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/detail', (async (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  try {
    if (token) {
      const trips = await tripController.getAllTrips(token);
      res.status(200).json(trips);
    } else res.status(403).json('Forbidden');
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const trip = await tripController.one(parseInt(req.params.id, 10));
    trip ? res.status(200).json(trip) : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

// router.get('/user-full-trip/:id', (async (req, res) => {
//   try {
//     const trip = await tripController.fullTrip(parseInt(req.params.id, 10));
//     trip ? res.status(200).json(trip) : res.status(404).json({ code: '404', message: 'entry does not exists' });
//   } catch (error) {
//     res.status(500).json({ code: '500', message: error });
//   }
// }) as RequestHandler);

router.get('/user-full-trip/:id', (async (req, res) => {
  try {
    const trips = await tripController.fullTrips(parseInt(req.params.id, 10));
    trips.length
      ? res.status(200).json(trips)
      : res.status(404).json({ code: '404', message: 'Aucun voyage trouvé pour cet utilisateur' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/user-full-trip-detail/:id', (async (req, res) => {
  try {
    const trip = await tripController.fullTripDetail(parseInt(req.params.id, 10));
    trip ? res.status(200).json(trip) : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <TripInterface>req.body;
    const trip = await tripController.new(
      body.user_id,
      body.country_id,
      body.duration,
      new Date(),
      new Date(),
      body.transportation_id,
      new Date(),
      new Date()
    );
    trip
      ? res.status(201).json(trip)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/create-full-trip', (async (req, res) => {
  try {
    const { trip, trip_transportation, trip_cities } = <FullTrip>req.body;

    if (!trip || !trip_transportation || !trip_cities) {
      return res.status(400).json({ code: '400', message: 'Missing required fields' });
    }
    const fullTrip = await tripController.createFullTrip(trip, trip_transportation, trip_cities);

    return res.status(201).json(fullTrip);
  } catch (error) {
    console.error('Error in /create_full_trip:', error);
    return res.status(500).json({ code: '500', message: 'Internal Server Error' });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <TripInterface>req.body;
  try {
    const trip = await tripController.update(
      parseInt(req.params.id, 10),
      body.user_id,
      body.country_id,
      body.duration,
      new Date(),
      new Date(),
      body.transportation_id,
      new Date()
    );
    trip ? res.status(200).json(trip) : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const trip = await tripController.delete(parseInt(req.params.id, 10));
    if (trip) {
      res.status(204).json();
    } else {
      res.status(404).json({ code: '404', message: 'entry does not exists' });
    }
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
