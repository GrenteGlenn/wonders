import { Router, RequestHandler } from 'express';
import TripHotelController from '../controllers/TripHotelController';
import TripHotelInterface from '../interfaces/TripHotelInterface';

const router = Router();
const tripHotelController = new TripHotelController();

router.get('/', (async (req, res) => {
  try {
    const tripDayActivity = await tripHotelController.list();
    res.status(200).json(tripDayActivity);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const tripDayActivity = await tripHotelController.one(parseInt(req.params.id, 10));
    tripDayActivity
      ? res.status(200).json(tripDayActivity)
      : res.status(404).json({ message: 'No trip trip city found' });
    res.status(200).json(tripDayActivity);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <TripHotelInterface>req.body;
    const tripDayActivity = await tripHotelController.new(
      body.trip_city_id,
      body.name,
      body.from,
      body.price,
      body.to,
      body.url,
      new Date(),
      new Date()
    );
    tripDayActivity
      ? res.status(201).json(tripDayActivity)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <TripHotelInterface>req.body;
  try {
    const tripDayActivity = await tripHotelController.update(
      parseInt(req.params.id, 10),
      body.trip_city_id,
      body.name,
      body.from,
      body.price,
      body.to,
      body.url,
      new Date()
    );
    tripDayActivity
      ? res.status(200).json(tripDayActivity)
      : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    await tripHotelController.delete(parseInt(req.params.id, 10));
    res.status(204);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
