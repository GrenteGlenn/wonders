import { Router, RequestHandler } from 'express';
import TripHotelController from '../controllers/TripHotelController';
import TripHotelInterface from '../interfaces/TripHotelInterface';

const router = Router();
const tripHotelController = new TripHotelController();

router.get('/', (async (req, res) => {
  try {
    const tripHotel = await tripHotelController.list();
    res.status(200).json(tripHotel);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const tripHotel = await tripHotelController.one(parseInt(req.params.id, 10));
    tripHotel ? res.status(200).json(tripHotel) : res.status(404).json({ message: 'No trip trip city found' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <TripHotelInterface>req.body;
    const tripHotel = await tripHotelController.new(body, new Date(), new Date());
    tripHotel
      ? res.status(201).json(tripHotel)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <TripHotelInterface>req.body;
  try {
    const tripHotel = await tripHotelController.update(parseInt(req.params.id, 10), body, new Date());
    tripHotel
      ? res.status(200).json(tripHotel)
      : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    await tripHotelController.delete(parseInt(req.params.id, 10));
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
