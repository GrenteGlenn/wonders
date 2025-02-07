import { Router, RequestHandler } from 'express';
import TripDayActivityController from '../controllers/TripDayActivityController';
import TripDayActivityInterface from '../interfaces/TripDayActivityInterface';

const tripDayActivityController = new TripDayActivityController();
const router = Router();

router.get('/', (async (req, res) => {
  try {
    const tripDayActivity = await tripDayActivityController.list();
    res.status(200).json(tripDayActivity);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const tripDayActivity = await tripDayActivityController.one(parseInt(req.params.id, 10));
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
    const body = <TripDayActivityInterface>req.body;
    const tripDayActivity = await tripDayActivityController.new(
      body.trip_day_id,
      body.activity_id,
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
  const body = <TripDayActivityInterface>req.body;
  try {
    const tripDayActivity = await tripDayActivityController.update(
      parseInt(req.params.id, 10),
      body.trip_day_id,
      body.activity_id
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
    await tripDayActivityController.delete(parseInt(req.params.id, 10));
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
