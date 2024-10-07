import { RequestHandler, Router } from 'express';
import TripController from '../controllers/TripController';

const router = Router();
const tripController = new TripController();

router.get('/trip', async (req, res) => {
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
  } as RequestHandler);

export default router;