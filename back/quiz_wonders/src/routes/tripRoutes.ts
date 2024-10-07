import { RequestHandler, Router } from 'express';
import TripController from '../controllers/TripController';
import TripInterface from '../interfaces/TripInterface';

const router = Router();
const tripController = new TripController();

interface Body {
    user_id: number;
    country_id: number;
    duration: number;
    from: Date;
    to: Date;
    transportation_id: number
  }

router.get('/', async (req, res) => {
    try {
      const trips = await tripController.list();
  
      if (!trips || trips.length === 0) {
        return res.status(404).json({ message: 'No trips found' });
      }
      res.status(200).json(trips);
    } catch (error) {
      console.error('Error fetching trips:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const trip = await tripController.one(parseInt(req.params.id, 10));
  
      if (!trip) {
        return res.status(404).json({ message: 'No trips found' });
      }
      res.status(200).json(trip);
    } catch (error) {
      console.error('Error fetching trips:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/', (async (req, res) => {
    try {
      const body = <TripInterface>req.body;
      const trip = await tripController.new(body.user_id, body.country_id, body.duration, new Date(), new Date(), body.transportation_id, new Date(), new Date());
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }) as RequestHandler);

  router.put('/:id', (async (req, res) => {
    const body = <TripInterface>req.body;
    try {
      const trip = await tripController.update(parseInt(req.params.id, 10), body.user_id, body.country_id, body.duration, new Date(), new Date(), body.transportation_id, new Date(), new Date());
      res.json(trip);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update trip' });
    }
  }) as RequestHandler);

  router.delete('/:id', (async (req, res) => {
    const body = <TripInterface>req.body;
    try {
      const trip = await tripController.delete(parseInt(req.params.id, 10));
      res.status(204).json(trip);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete trip' });
    }
  }) as RequestHandler);

export default router;