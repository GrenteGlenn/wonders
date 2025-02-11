import { RequestHandler, Router } from 'express';
import TripController from '../controllers/TripController';
import TripInterface from '../interfaces/TripInterface';

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
router.get('/:id', (async (req, res) => {
  try {
    const trip = await tripController.one(parseInt(req.params.id, 10));
    trip ? res.status(200).json(trip) : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/users-full-trips', (async (req, res) => {
  try {
    const trip = await tripController.fullTrips();
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/user-full-trip/:id', (async (req, res) => {
  try {
    const trip = await tripController.fullTrip(parseInt(req.params.id, 10));
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
