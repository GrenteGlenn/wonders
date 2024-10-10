import { RequestHandler, Router } from "express";
import TripTransportationController from "../controllers/TripTransportationController";
import TripTrasportationInterface from "../interfaces/TripTransportationInterface";

const tripTransportationController = new TripTransportationController;

const router = Router();

router.get('/', async (req, res) => {
    try {
      const tripTransportations = await tripTransportationController.list();
  
      if (!tripTransportations) {
        return res.status(404).json({ message: 'No trip transportations found' });
      }
      res.status(200).json(tripTransportations);
    } catch (error) {
      console.error('Error fetching trip transportations:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const tripTransportation = await tripTransportationController.one(parseInt(req.params.id, 10));
  
      if (!tripTransportation) {
        return res.status(404).json({ message: 'No trip transportations found' });
      }
      res.status(200).json(tripTransportation);
    } catch (error) {
      console.error('Error fetching trip transportation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/', (async (req, res) => {
    try {
      const body = <TripTrasportationInterface>req.body;
      const trip = await tripTransportationController.new(body.from, body.to, body.price, body.url, new Date(), new Date());
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }) as RequestHandler);

  router.put('/:id', (async (req, res) => {
    const body = <TripTrasportationInterface>req.body;
    try {
      const trip = await tripTransportationController.update(parseInt(req.params.id, 10), body.from, body.to, body.price, body.url, new Date(), new Date());
      res.json(trip);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update a trip transportation' });
    }
  }) as RequestHandler);

  router.delete('/:id', (async (req, res) => {
    const body = <TripTrasportationInterface>req.body;
    try {
      const trip = await tripTransportationController.delete(parseInt(req.params.id, 10));
      res.status(204).json(trip);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete a trip transportation' });
    }
  }) as RequestHandler);

export default router; 