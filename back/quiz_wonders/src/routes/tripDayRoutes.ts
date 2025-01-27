import { Router, RequestHandler } from 'express';
import TripDayController from '../controllers/TripDayController';
import TripDayInterface from '../interfaces/TripDayInterface';

const router = Router();
const tripDayController = new TripDayController();

router.get('/', (async (req, res) => {
  try {
    const tripDay = await tripDayController.list();
    res.status(200).json(tripDay);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const tripDay = await tripDayController.one(parseInt(req.params.id, 10));
    tripDay ? res.status(200).json(tripDay) : res.status(404).json({ message: 'No trip trip city found' });
    res.status(200).json(tripDay);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <TripDayInterface>req.body;
    const tripDay = await tripDayController.new(body.trip_city_id, body.date, new Date(), new Date());
    tripDay
      ? res.status(201).json(tripDay)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <TripDayInterface>req.body;
  try {
    const tripDay = await tripDayController.update(parseInt(req.params.id, 10), body.trip_city_id, body.date);
    tripDay ? res.status(200).json(tripDay) : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    await tripDayController.delete(parseInt(req.params.id, 10));
    res.status(204);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
