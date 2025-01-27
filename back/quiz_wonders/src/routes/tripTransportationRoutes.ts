import { RequestHandler, Router } from 'express';
import TripTransportationController from '../controllers/TripTransportationController';
import TripTrasportationInterface from '../interfaces/TripTransportationInterface';

const tripTransportationController = new TripTransportationController();

const router = Router();

router.get('/', (async (req, res) => {
  try {
    const tripTransportations = await tripTransportationController.list();
    res.status(200).json(tripTransportations);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const tripTransportation = await tripTransportationController.one(parseInt(req.params.id, 10));
    tripTransportation
      ? res.status(200).json(tripTransportation)
      : res.status(404).json({ message: 'No trip transportations found' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <TripTrasportationInterface>req.body;
    const tripTrasportation = await tripTransportationController.new(
      body.from_date,
      body.to_date,
      body.price,
      body.url,
      new Date(),
      new Date()
    );
    tripTrasportation
      ? res.status(201).json(tripTrasportation)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <TripTrasportationInterface>req.body;
  try {
    const tripTrasportation = await tripTransportationController.update(
      parseInt(req.params.id, 10),
      body.from_date,
      body.to_date,
      body.price,
      body.url
    );
    tripTrasportation
      ? res.status(200).json(tripTrasportation)
      : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    await tripTransportationController.delete(parseInt(req.params.id, 10));
    res.status(204);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
